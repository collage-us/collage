import os
import requests
import flask
import collage
from dotenv import load_dotenv
from datetime import datetime
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS
# from collage.server.auth import auth
# from authlib.integrations.flask_client import OAuth
import io
from collage.server.recommend import recommend_classes
from collage.server.dalle import generate_image, format_prompt
from collage.server.nltk import parse_resume

CORS(collage.app)
# Initialize JWTManager
collage.app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')  # Replace with your own secret key
collage.app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies', 'json']
jwt = JWTManager(collage.app)

load_dotenv()  # Load the environment variables from the .env file

GOOGLE_CLIENT_ID = os.environ['GOOGLE_CLIENT_ID']
GOOGLE_SECRET_KEY = os.environ['GOOGLE_SECRET_KEY']

def verify_user():
    """
        Ensures that the currently logged in user has completed their profile and has been added
        to the database. Should be called within any function that requires user information.
    """
    if flask.session['registered'] != True:
        return flask.jsonify(unregistered=True), 200


@collage.app.route('/api/', methods=['GET'])
def home():
    return flask.jsonify(working=True), 200


@collage.app.route('/api/login/', methods=['POST'])
def login():
    auth_code = flask.request.get_json()['code']
    if not flask.session.get('registered'):
        flask.session['registered'] = False
    data = {
        'code': auth_code,
        'client_id': GOOGLE_CLIENT_ID,  # client ID from the credential at google developer console
        'client_secret': GOOGLE_SECRET_KEY,  # client secret from the credential at google developer console
        'redirect_uri': 'postmessage',
        'grant_type': 'authorization_code'
    }

    response = requests.post('https://oauth2.googleapis.com/token', data=data).json()
    headers = {
        'Authorization': f'Bearer {response["access_token"]}'
    }
    user_info = requests.get('https://www.googleapis.com/oauth2/v3/userinfo', headers=headers).json()
    print(user_info)
    if 'hd' in user_info.keys():
        if user_info['hd'][-4:] == ".edu":
            """
                check here if user exists in database, if not, mark session user as unregistered, otherwise mark user as registered.
            """
            flask.session['current_user'] = user_info['email']
            flask.session['registered'] = False
            # connection = collage.model.get_db()
            # with connection.cursor(dictionary=True) as cursor:
            #     user_query = """
            #                 SELECT *
            #                 FROM users
            #                 WHERE user_email = %s
            #             """
            #     cursor.execute(user_query, (user_info['email'],))
            #     result = cursor.fetchone()
            #     if result is None:
            #         flask.session['registered'] = False
            #     else:
            #         flask.session['registered'] = True
            #         flask.session['current_user_id'] = result[0]
            jwt_token = create_access_token(identity=user_info['email'])  # create jwt token
            print(jwt_token)
            response = flask.jsonify(status="success", user=user_info, registered=flask.session['registered']) # change the response to whatever is needed for other frontend operations
            response.set_cookie('access_token', value=jwt_token, secure=True)
            return response, 200
    else:
        print("login_failure")
        return flask.jsonify(status="failed"), 200

@collage.app.route('/api/signup/', methods=['POST'])
@jwt_required()
def signup():
    """
        Users will be redirected here after a successful login if the login endpoint
        includes an 'unregistered' flag in the response.
    """
    data = flask.request.get_json()
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        insert_query = """
                    INSERT INTO users (email, full_name, start_year, graduation_year, enrollment_date,
                    credits_completed, major, last_updated, created_at) VALUES (%s, %s, %i, %i, %s, %i, %s, %s, %s)
                """
        cursor.execute(insert_query, (flask.session['current_user'], data['full_name'], data['start_year'], data['graduation_year'],
                                      data['enrollment_date'], data['credits_complete'], data['major'], datetime.now().strftime("%m/%d/%Y, %H:%M:%S"), datetime.now().strftime("%m/%d/%Y, %H:%M:%S")))
        flask.session['registered'] = True
        flask.session['current_user_id'] = cursor.lastrowid
    connection.commit()
    return flask.jsonify(registered=True), 200 # also send back any other needed information later


@collage.app.route('/api/logout/', methods=['POST'])
@jwt_required()
def logout():
    flask.session['registered'] = False
    flask.session['current_user'] = None
    flask.session['current_user_id'] = None
    jwt_token = flask.request.cookies.get('access_token') # Demonstration how to get the cookie
    # current_user = get_jwt_identity()
    print(jwt_token)
    return flask.jsonify(registered=False), 200


@collage.app.route('/api/catalog/', methods=['POST'])
@jwt_required()
def handle_catalog():
    verify_user()
    connection = collage.model.get_db()  # open db
    # assume JSON data format is {'user_id": INT}
    data = flask.request.get_json()
    user_id = data['user_id']
    recommendations = recommend_classes(connection, user_id)

    # the user does not exist
    if recommendations == None:
        return flask.jsonify(
            {"status": "failure"}
        )

    recommendations = recommendations.to_dict(orient='records')

    for course in recommendations:
        course_id = course['course_id']

        with connection.cursor(dictionary=True) as cursor:
            course_info_query = """
                SELECT subject code, catalog_number,
                credit_hours, instructor_id, course_name,
                course_description, class_topic, ai_img_url
                FROM courses
                WHERE course_id = %s
            """
            cursor.execute(course_info_query, (course_id,))
            course = cursor.fetchone()
        course['course_id'] = course_id

        # check whether an AI image has been generated for that course
        if course['ai_img_url'] == None:
            prompt = format_prompt(course['course_description'], course['class_topic'])
            img_url = generate_image(
                model="dall-e-3",
                prompt=prompt
            )
            course['ai_img_url'] = img_url

            with connection.cursor(dictionary=True) as cursor:
                img_query = """
                    UPDATE courses
                    SET ai_img_url = %s
                    WHERE course_id = %s
                """
                cursor.execute(img_query, (img_url, course_id))
                connection.commit()

    # return the JSON of "a list of dictionaries"
    return flask.jsonify(recommendations)


@collage.app.route('/api/courses/<int:course_id>', methods=['POST'])
def course_backpack(course_id):
    op = flask.request.args.get('operation')
    user_id = flask.request.args.get('user_id')
    connection = collage.model.get_db()
    cursor = connection.cursor()

    if op == 'save':
        try:
            cursor.execute('''
                INSERT INTO saved_courses (user_id, course_id)
                VALUES (%s, %s)
            ''', (user_id, course_id))
            connection.commit()
            return flask.jsonify({'status': 'success', 'message': 'Course saved successfully'}), 200
        except Exception as e:
            connection.rollback()
            return flask.jsonify({'status': 'error', 'message': str(e)}), 500

    elif op == 'delete':
        try:
            cursor.execute('''
                DELETE FROM saved_courses
                WHERE user_id = %s AND course_id = %s
            ''', (user_id, course_id))
            connection.commit()
            return flask.jsonify({'status': 'success', 'message': 'Course removed successfully'}), 200
        except Exception as e:
            connection.rollback()
            return flask.jsonify({'status': 'error', 'message': str(e)}), 500

    else:
        return flask.jsonify({'status': 'error', 'message': 'Invalid operation'}), 400


@collage.app.route('/api/student/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_stats(user_id):
    verify_user()
    op = flask.request.args.get('operation')
    connection = collage.model.get_db()
    try:
        if op == 'user_stats':
            with connection.cursor(dictionary=True) as cursor:
                follower_query = """
                    SELECT COUNT(*)
                    AS follower_count
                    FROM followers
                    WHERE followed_id = %s
                """
                cursor.execute(follower_query, (user_id,))
                follower_count = cursor.fetchone()['follower_count']

                profile_view_query = """
                    SELECT COUNT(*)
                    AS view_count
                    FROM profileViewers
                    WHERE viewed_id = %s
                """

                cursor.execute(profile_view_query, (user_id,))
                view_count = cursor.fetchone()['view_count']

            response = {
                'follower_count': follower_count,
                'view_count': view_count
            }
        elif op == 'student_info':
            with connection.cursor(dictionary=True) as cursor:
                student_info_query = """
                    SELECT graduation_year, start_year
                    FROM users
                    WHERE user_id = %s
                """
                cursor.execute(student_info_query, (user_id,))
                student_info = cursor.fetchone()

                credits_completed_query = """
                    SELECT credits_completed
                    FROM users
                    WHERE user_id = %s
                """
                cursor.execute(credits_completed_query, (user_id,))
                credits_completed = cursor.fetchone()['credits_completed']

                major_credits_query = """
                    SELECT major_credits_required
                    FROM users
                    WHERE user_id = %s
                """
                cursor.execute(major_credits_query, (user_id,))
                credits_required = cursor.fetchone()['credits_required']

            response = {
                'graduation_year': student_info['graduation_year'],
                'registration_term': student_info['start_year'],
                'credits_completed': credits_completed,
                'credits_required': credits_required
            }

        else:
            response = {'error': 'Invalid operation specified'}

        return flask.jsonify(response)

    except Exception as e:
        return flask.jsonify({'error': str(e)}), 500

    finally:
        connection.close()


@collage.app.route('/api/search/classes/<string:search_string>/<int:user_id>/', methods=['POST'])
def search_classes(serach_string,user_id):
    #take things in as a json object
    search_params = flask.request.get_json()


@collage.app.route('/api/test/', methods=['GET'])
def test():
    """A test endpoint for checking whether backend Python code can be compiled."""
    return flask.jsonify({"flag": "success"})


@collage.app.route('/upload/resume/', methods=['POST'])
def upload_file():
    if 'file' not in flask.request.files:
        return flask.jsonify({'error': 'No file part'}), 400

    file = flask.request.files['file']
    if file.filename == '':
        return flask.jsonify({'error': 'No selected file'}), 400

    if file:
        connection = collage.model.get_db()
        data = flask.request.get_json()
        user_id = data['user_id']
        file_stream = io.BytesIO(file.read())
        keywords_string = parse_resume(file_stream)
        # Updates the users table's keywords column
        with connection.cursor(dictionary=True) as cursor:
            keywords_query = """
                UPDATE users
                SET keywords = %s
                WHERE user_id = %s
            """
            cursor.execute(keywords_query, (keywords_string, user_id))
            connection.commit()
        return flask.jsonify({'success': 'keywords extracted'})

# OAuth setup
# oauth = OAuth(collage.app)

# google = oauth.register(
#     name='google',
#     client_id='YOUR_CLIENT_ID',  # TODO: change this
#     client_secret='YOUR_CLIENT_SECRET',
#     access_token_url='https://accounts.google.com/o/oauth2/token',
#     access_token_params=None,
#     authorize_url='https://accounts.google.com/o/oauth2/auth',
#     authorize_params=None,
#     userinfo_endpoint='https://www.googleapis.com/oauth2/v1/userinfo',  # This is only needed if using openId to fetch user info
#     client_kwargs={'scope': 'openid profile email'},
# )


# @collage.app.route('/api/accounts/', methods=['POST'])
# def handle_accounts():
#     """Handles login/logout, creating/deleting/editing accounts, and updating passwords."""
#     main_url = "/"
#     form = flask.request.form
#     op = form.get("operation")

#     if op == "login":
#         try:
#             token = google.authorize_access_token()
#             resp = google.get('userinfo')
#             user_info = resp.json()
#             flask.session['email'] = user_info['email']
#             context = {
#                 "status": "success"
#             }
#         except Exception as e:
#             context = {
#                 "status": "failure"
#             }
#         return flask.jsonify(**context)

#     elif op == "logout":
#         flask.session.pop('email', None)
#         return flask.redirect(main_url)
