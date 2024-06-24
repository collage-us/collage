import flask
import collage
from collage.server.auth import auth
from authlib.integrations.flask_client import OAuth


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
    # email_input = form.get("email")
    # password_input = form.get("password")
    # connection = collage.model.get_db()

    if op == "login":
        # if auth(connection, email_input, password_input):  # authentication is successful
        #     return flask.redirect(main_url)
        # else:
        #     flask.abort(403)
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
