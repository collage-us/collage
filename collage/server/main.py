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
from collage.server.nltk_utils import parse_resume

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
            connection = collage.model.get_db()
            with connection.cursor(dictionary=True) as cursor:
                user_query = """
                            SELECT *
                            FROM users
                            WHERE email = %s
                        """
                cursor.execute(user_query, (user_info['email'],))
                result = cursor.fetchone()
                if result is None:
                    flask.session['registered'] = False
                else:
                    flask.session['registered'] = True
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
                    credits_completed, keywords, major) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """
        print(insert_query)
        print(data)
        cursor.execute(insert_query, (flask.session['current_user'], data['full_name'], data['start_year'], data['graduation_year'],
                                      data['enrollment_date'], data['credits_completed'], data['temporary_keywords'], data['major']))
        flask.session['registered'] = True
    connection.commit()
    return flask.jsonify(registered=True), 200 # also send back any other needed information later


@collage.app.route('/api/logout/', methods=['POST'])
@jwt_required()
def logout():
    flask.session['registered'] = False
    flask.session['current_user'] = None
    jwt_token = flask.request.cookies.get('access_token') # Demonstration how to get the cookie
    # current_user = get_jwt_identity()
    print(jwt_token)
    return flask.jsonify(registered=False), 200

# @collage.app.route('/api/init/', methods=['GET'])
# def initialize_classes():
#     # classes = [{'subject_code': 'ASTRO 106', 'catalog_number': 0, 'credit_hours': 1, 'location': 'North Campus', 'instructor_id': 1,
#     #             'topic_description': 'lsa', 'course_name': 'Aliens', 'course_description': 'evolution, interstellar travel, space exploration, extraterrestrial organisms', 'class_topic': 'natural science', 
#     #             'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1-kRA35fv-D5Dc6kC6hL6O6_H60UWD9fp=s220'}]
#     classes = [
#                 {'subject_code': 'ECON 101', 'catalog_number': 0, 'credit_hours': 4, 'location': 'North Campus', 'instructor_id': 1,
#                  'topic_description': 'lsa', 'course_name': 'Principles of Economics I', 'course_description': 'microeconomics, supply and demand, competition, taxes, trade', 'class_topic': 'economics', 
#                  'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1MDipcyr_JVs-TADYOc-i4j71xWvivQml=s220'},
#                 {'subject_code': 'EECS 183', 'catalog_number': 0, 'credit_hours': 4, 'location': 'North Campus', 'instructor_id': 1,
#                  'topic_description': 'engineering', 'course_name': 'EECS 183', 'course_description': 'programming, data, algorithms, computing, problem solving', 'class_topic': 'computer science', 
#                  'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1LbYOSJnTuDsPhNS8pFE6_y4r3M1ax3aZ=s220'},
#                 {'subject_code': 'Data Science 315', 'catalog_number': 0, 'credit_hours': 4, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'lsa', 'course_name': 'Statistics and Artificial Intelligence', 'course_description': 'statistics, artificial intelligence, deep neural networks, data transmission and generation', 'class_topic': 'data science', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1cAVe_WcKsT6bpSmV_3Fe-jwAGPWGgGlE=s220'},
#                 {'subject_code': 'FTVM 272', 'catalog_number': 0, 'credit_hours': 3, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'lsa', 'course_name': 'Classical Film Theory I', 'course_description': 'film theory, editing, media, digital culture, television', 'class_topic': 'film', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1ZiXTIQj1e_RSWcjWdoVpK1k06MkSN-2x=s220'},
#                 {'subject_code': 'IOE 202', 'catalog_number': 0, 'credit_hours': 2, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'engineering', 'course_name': 'Operations Engineering and Analytics', 'course_description': 'engineering, mathematical modeling, statistical analysis, manufacturing, optimization, transportation', 'class_topic': 'ioe', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1E2tv_166cXK0yi78-sHeQUTI1l-U5aH9=s220'},
#                 {'subject_code': 'MATH 217', 'catalog_number': 0, 'credit_hours': 4, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'lsa', 'course_name': 'Linear Algebra', 'course_description': 'problem solving, applications, engineering and sciences, mathematics', 'class_topic': 'mathematics', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1uIseE0Gakg3P2GVNcMrlperc57zFQDB5=s220'},
#                 {'subject_code': 'PHIL 183', 'catalog_number': 0, 'credit_hours': 3, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'lsa', 'course_name': 'Critical Reasoning', 'course_description': 'logic, decision making, practical and professional reasoning skills, statistics', 'class_topic': 'philosophy', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1fzPuvS59CJDaJXLnqCQQjDfVBVwqlR1j=s220'},
#                 {'subject_code': 'PSYCH 223', 'catalog_number': 0, 'credit_hours': 3, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'lsa', 'course_name': 'Entrepreneurial Creativity', 'course_description': 'entrepreneurship, leadership, business and technology development, communication', 'class_topic': 'psychology', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1KHNTtdPgXVf9nuoE-GvkD-9NUlufLAa2=s220'},
#                 {'subject_code': 'BIO 212', 'catalog_number': 0, 'credit_hours': 3, 'location': 'North Campus', 'instructor_id': 1,
#                  'topic_description': 'lsa', 'course_name': 'Plants and Human Health', 'course_description': 'medicine, health, botany, plants and food', 'class_topic': 'biology', 
#                  'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1CIucc6uVl_CQsL3I0MeDSP_iGsJqBTMt=s220'},
#                 {'subject_code': 'PSYCH 337', 'catalog_number': 0, 'credit_hours': 3, 'location': 'North Campus', 'instructor_id': 1,
#                  'topic_description': 'lsa', 'course_name': 'Hormones and Behavior', 'course_description': 'biopsychology, sex, learning and memory, response to stimuli', 'class_topic': 'psychology', 
#                  'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1OQnXy7-MqQL39mvns5nc6B6KSuAEJu0w=s220'},
#                 {'subject_code': 'SPANISH 231', 'catalog_number': 0, 'credit_hours': 4, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'lsa', 'course_name': 'Second Year Spanish', 'course_description': 'language, culture, Spanish speaking, reading, writing', 'class_topic': 'foreign language', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1hWbBp8bFLf7ekcE8qi2DYktuJA-SNf9h=s220'},
#                 # {'subject_code': 'ASTRO 106', 'catalog_number': 0, 'credit_hours': 1, 'location': 'North Campus', 'instructor_id': 1,
#                 # 'topic_description': 'lsa', 'course_name': 'Aliens', 'course_description': 'evolution, interstellar travel, space exploration, extraterrestrial organisms', 'class_topic': 'natural science', 
#                 # 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1-kRA35fv-D5Dc6kC6hL6O6_H60UWD9fp=s220'},
#                 {'subject_code': 'CHEM 260', 'catalog_number': 0, 'credit_hours': 3, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'lsa', 'course_name': 'Chemical Principles', 'course_description': 'matter, thermodynamics, chemical kinetics, spectroscopic and electrochemical analysis', 'class_topic': 'natural science', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1zRgMJe9_i3Mx2vdgfWroaYVVzkDQBjKD=s220'},
#                 {'subject_code': 'COMM 341', 'catalog_number': 0, 'credit_hours': 3, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'lsa', 'course_name': 'Fasion and Media', 'course_description': 'fashion industry, identity, representation, technology, the environment, labor, and the law', 'class_topic': 'communcations', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1xir_qVnKJexIT9aGB6JPnUJH6_x6LN2b=s220'},
#                 {'subject_code': 'EARTH 125', 'catalog_number': 0, 'credit_hours': 3, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'lsa', 'course_name': 'Evolution and Extinction', 'course_description': '', 'class_topic': 'natural science', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1rQsrikEaoXTKzCx482yRUQ4K6KxnTiKt=s220'},
#                 {'subject_code': 'MKT 407', 'catalog_number': 0, 'credit_hours': 3, 'location': 'North Campus', 'instructor_id': 1,
#                 'topic_description': 'business', 'course_name': 'Designing Persuasive Communication', 'course_description': 'persuasion, strategy, film, video, photography, web design, media planning, teamwork', 'class_topic': 'finance', 
#                 'enrollment_status': 'open', 'ai_img_url': 'https://lh3.googleusercontent.com/d/1nHGN8sWh1pPZmCqIAB1isKdGMID45zwR=s220'},
#             ]
#     connection = collage.model.get_db()
#     with connection.cursor(dictionary=True) as cursor:
#         # instructor_query = """INSERT INTO instructors (full_name, department, email) VALUES (%s, %s, %s)"""
#         # cursor.execute(instructor_query, ('Andrew DeOrio', 'Engineering', 'awdeorio@umich.edu'))
#         # connection.commit()
#         for entry in classes:
#             insert_query = """
#                         INSERT INTO courses (subject_code, catalog_number, credit_hours, location, instructor_id,
#                         topic_description, course_name, course_description, class_topic, enrollment_status, ai_img_url) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#                     """

#             cursor.execute(insert_query, (entry['subject_code'], entry['catalog_number'], entry['credit_hours'], entry['location'], entry['instructor_id'],
#                         entry['topic_description'], entry['course_name'], entry['course_description'], entry['class_topic'], entry['enrollment_status'], entry['ai_img_url']))
#     connection.commit()
#     print("success")
#     return

@collage.app.route('/api/search/', methods=['POST'])
# @jwt_required()
def search_with_filters():
    # For now, topic description is the school
    # and course_description is keywords
    # major is under class topic
    # verify_user()
    colors = ["#C2D7FE", "#B8FFC8", "#C2D7FE", "#B8FFC8", "#FF7C7C", "#FFE6C1", "#FF7C7C", "#FFE6C1"]
    connection = collage.model.get_db()  # open db
    data = flask.request.get_json()
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("""SELECT subject_code, credit_hours, topic_description, course_name, course_description, class_topic, ai_img_url FROM courses""")
        results = cursor.fetchall()
    temp_results = []
    if data['search_string'] != '':
        for result in results:
            #if the search string appears in any of the relevant fields
            if data['search_string'] in result['subject_code'].lower() or data['search_string'].lower() in result['topic_description'] or data['search_string'].lower() in result['course_name'] or data['search_string'] in result['course_description'].lower() or data['search_string'] in result['class_topic'].lower():
                temp_results.append(result)
    else:
        temp_results = results
    data['filters'].sort()
    dupes = set()
    final = []
    for filter in data['filters']:
        actual = filter[1:]
        for temp in temp_results:
            if filter[0] == 's':
                if actual == temp['topic_description'] and temp['subject_code'] not in dupes:
                    final.append(temp)
                    dupes.add(temp['subject_code'])
            elif filter[0] == 'c':
                if int(actual) == temp['credit_hours'] and temp['subject_code'] not in dupes:
                    final.append(temp)
                    dupes.add(temp['subject_code'])
            elif filter[0] == 'm':
                if actual == temp['class_topic'] and temp['subject_code'] not in dupes:
                    final.append(temp)
                    dupes.add(temp['subject_code'])
    if len(data['filters']) == 0:
        final = temp_results
    counter = 0
    print(final)
    for result in final:
        print(counter % 8)
        result['color'] = colors[counter % 8]
        counter += 1
    print(final)
    return flask.jsonify(final), 200


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


@collage.app.route('/api/delete/', methods=['GET'])
def delete():
    conn = collage.model.get_db()

    # Create a cursor object
    cursor = conn.cursor()

    # Execute a query
    cursor.execute("DELETE FROM users WHERE email = %s", ('jadensun@umich.edu',))
    conn.commit()
    conn.close()

    return flask.jsonify({"flag": "success"})


@collage.app.route('/api/test/', methods=['GET'])
def test():
    conn = collage.model.get_db()

    # Create a cursor object
    cursor = conn.cursor()

    # Execute a query
    cursor.execute("SHOW TABLES")

    # Fetch and print results
    for table in cursor:
        print(table)

    return flask.jsonify({"flag": "success"})


# @collage.app.route('/upload/resume/', methods=['POST'])
# def upload_file():
#     if 'file' not in flask.request.files:
#         return flask.jsonify({'error': 'No file part'}), 400

#     file = flask.request.files['file']
#     if file.filename == '':
#         return flask.jsonify({'error': 'No selected file'}), 400

#     if file:
#         connection = collage.model.get_db()
#         data = flask.request.get_json()
#         user_id = data['user_id']
#         file_stream = io.BytesIO(file.read())
#         keywords_string = parse_resume(file_stream)
#         # Updates the users table's keywords column
#         with connection.cursor(dictionary=True) as cursor:
#             keywords_query = """
#                 UPDATE users
#                 SET keywords = %s
#                 WHERE user_id = %s
#             """
#             cursor.execute(keywords_query, (keywords_string, user_id))
#             connection.commit()
#         return flask.jsonify({'success': 'keywords extracted'})

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
