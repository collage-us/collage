import flask
import collage
# from collage.server.auth import auth
from authlib.integrations.flask_client import OAuth
from collage.server.recommend import recommend_classes


# OAuth setup
oauth = OAuth(collage.app)

google = oauth.register(
    name='google',
    client_id='YOUR_CLIENT_ID',  # TODO: change this
    client_secret='YOUR_CLIENT_SECRET',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    userinfo_endpoint='https://www.googleapis.com/oauth2/v1/userinfo',  # This is only needed if using openId to fetch user info
    client_kwargs={'scope': 'openid profile email'},
)


@collage.app.route('/api/accounts/', methods=['POST'])
def handle_accounts():
    """Handles login/logout, creating/deleting/editing accounts, and updating passwords."""
    main_url = "/"
    form = flask.request.form
    op = form.get("operation")

    if op == "login":
        try:
            token = google.authorize_access_token()
            resp = google.get('userinfo')
            user_info = resp.json()
            flask.session['email'] = user_info['email']
            return flask.redirect('/')
        except Exception as e:
            flask.abort(403)

    elif op == "logout":
        flask.session.pop('email', None)
        return flask.redirect(main_url)


@collage.app.route('/api/catalog/', methods=['POST'])
def handle_catalog():
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