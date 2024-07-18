from flask import render_template
import collage

@collage.app.route('/')
def get_index():
    return render_template('index.html')
