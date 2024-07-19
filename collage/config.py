"""Collage development configuration."""

import pathlib

APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = b'%\xb5\x99\x11\xda\x162\x114:"\x1f\x0b\xa1\x94 \
    \r\xe6\xd8\x88&\xbbp\xf0\xc1'
SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
COLLAGE_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = COLLAGE_ROOT/'var'/'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024
