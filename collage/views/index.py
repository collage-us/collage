from flask import Blueprint, render_template

bp = Blueprint('index', __name__)

@bp.route('/')
def get_index():
    return render_template('index.html')