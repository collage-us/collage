"""Render Empty HTML."""
import flask
import collage


@collage.app.route('/')
def get_index():
    return flask.render_template("index.html")