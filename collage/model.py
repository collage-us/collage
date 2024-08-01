"""Database setup."""

from flask import g
import mysql.connector
import collage
import os
from dotenv import load_dotenv

load_dotenv()

def get_db():
    """This function can be called when trying to access the database:
    connection = db.getdb()"""

    if 'db' not in g or not g.db.is_connected():
        g.db = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_DATABASE')
        )
    return g.db


@collage.app.teardown_appcontext
def close_db(e=None):
    db = g.pop('db', None)

    if db is not None and db.is_connected():
        db.close()
