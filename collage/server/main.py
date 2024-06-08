import flask
import collage
from collage.server.auth import auth


@collage.app.route('/api/accounts/', methods=['POST'])
def handle_accounts():
    """Handles login, creating/deleting/editing accounts, and updating passwords."""
    main_url = "/"
    form = flask.request.form

    op = form.get("operation")
    email_input = form.get("email")
    password_input = form.get("password")
    connection = collage.model.get_db()

    if op == "login":
        if auth(connection, email_input, password_input):  # authentication is successful
            return flask.redirect(main_url)
        else:
            flask.abort(403)