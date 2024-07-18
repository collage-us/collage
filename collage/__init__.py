"""Collage package initializer."""
import flask
import os
from authlib.integrations.flask_client import OAuth

# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)

# Read settings from config module (collage/config.py)
app.config.from_object('collage.config')

app.config.from_envvar('COLLAGE_SETTINGS', silent=True)

app.secret_key = os.environ.get("FLASK_SECRET_KEY", "your_secret_key")

def create_app():
    app = flask.Flask(__name__, static_folder='../static', template_folder='../templates')

    # Import and register your blueprints here
    from collage.views import index_bp
    app.register_blueprint(index_bp)

    return app

import collage.server
import collage.views
# import collage.model