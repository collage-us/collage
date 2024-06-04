"""Database setup."""

from flask import g
import mysql.connector
import collage


def getdb():
    """This function can be called when trying to access the database:
    connection = db.getdb()"""

    if 'db' not in g or not g.db.is_connected():
        g.db = mysql.connector.connect(
            host=collage.config['DB_HOST'],
            user=collage.config['DB_USER'],
            password=collage.config['DB_PASSWORD'],
            database=collage.config['DB_DATABASE'],
            ssl_verify_identity=True,
            ssl_ca='SSL/certs/ca-cert.pem'
        )
    return g.db


@collage.app.teardown_appcontext
def close_db(e=None):
    db = g.pop('db', None)

    if db is not None and db.is_connected():
        db.close()
