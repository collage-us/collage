"""Helper functions for authentication operations."""


def auth(connection, email_input, password_input):
    """Authenticate whether the email_input exists in MySQL database.
    If yes, we then check whether the password_input corresponds to the correct password in DB.
    Return True if the authentication is successful;
    Return False otherwise."""
    # checking whether the user entered either empty email address or password
    if not len(email_input) or not len(password_input):
        return False

    select_password_query = """
        SELECT password
        FROM users
        WHERE email=%s
    """
    val_query = (email_input,)

    with connection.cursor() as cursor:
        cursor.execute(select_password_query, val_query, multi=True)
        result = cursor.fetchone()

        if not result:  # the user email does not exist
            return False

        password_db = result["password"]  # get the correct password from the database
        if not correct_password(connection, password_input, password_db):  # wrong password
            return False

    return True  # authentication is successful


def correct_password(connection, password_in, password_db):
    """Return True when the user's actual password stored in database matched the user's input."""
    # TODO: we need to use a password hashing algorithm for security reasons
    return True