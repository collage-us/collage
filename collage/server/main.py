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
from collage.server.recommend import recommend_classes

# Initialize JWTManager
collage.app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Replace with your own secret key
collage.app.config['JWT_TOKEN_LOCATION'] = ['cookies']
jwt = JWTManager(collage.app)

load_dotenv()  # Load the environment variables from the .env file

GOOGLE_CLIENT_ID = os.environ['GOOGLE_CLIENT_ID']
GOOGLE_SECRET_KEY = os.environ['GOOGLE_SECRET_KEY']
flask.session['registered'] = False # initialize registered

def verify_user():
    """
        Ensures that the currently logged in user has completed their profile and has been added
        to the database. Should be called within any function that requires user information.
    """
    if flask.session['registered'] != True:
        return flask.jsonify(unregistered=True), 200

@collage.app.route('/api/login/', methods=['POST'])
def login():
    auth_code = flask.request.get_json()['code']

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
    """
        check here if user exists in database, if not, mark session user as unregistered, otherwise mark user as registered.
    """
    flask.session['current_user'] = user_info['email']
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        user_query = """
                    SELECT *
                    FROM users
                    WHERE user_email = %s
                """
        cursor.execute(user_query, (user_info['email'],))
        result = cursor.fetchone()
        if result is None:
            flask.session['registered'] = False
        else:
            flask.session['registered'] = True
            flask.session['current_user_id'] = result[0]
    jwt_token = create_access_token(identity=user_info['email'])  # create jwt token
    response = flask.jsonify(user=user_info, registered=flask.session['registered']) # change the response to whatever is needed for other frontend operations
    response.set_cookie('access_token_cookie', value=jwt_token, secure=True)

    return response, 200

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
    return flask.jsonify(registered=False), 200

@collage.app.route('/api/catalog/', methods=['POST'])
@jwt_required()
def handle_catalog():
    verify_user()
    # connection = collage.model.get_db()  # open db

    # select_all_classes_query = """
    #     SELECT *
    #     FROM classes
    # """

    # with connection.cursor() as cursor:
    #     cursor.execute(select_all_classes_query)
    #     classes = cursor.fetchall()
    data = flask.request.get_json()
    user_id = data['user_id']
    recommendations = recommend_classes(user_id)
    return flask.jsonify(recommendations.to_dict(orient='records'))


@collage.app.route('/api/user_stats/<int:user_id>', methods=['GET'])
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
