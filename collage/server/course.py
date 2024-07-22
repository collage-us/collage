import collage
import flask

@collage.app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course_page(course_id):
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        course_query = """
            SELECT *
            FROM courses
            WHERE course_id = %s
        """
        cursor.execute(course_query, (course_id,))

        subject = cursor.fetchone()['subject_code']
        catalog_number = cursor.fetchone()['catalog_number']
        credits = cursor.fetchone()['credit_hours']
        course_name = cursor.fetchone()['course_name']
        course_description = cursor.fetchone()['course_description']
        status = cursor.fetchone()['enrollment_status']

        full_name = f"{subject} {catalog_number}"
        # TODO: add the Collage Board, Prompt Questions
        context = {
            "full_name": full_name,  # ECON 101
            "course_name": course_name,  # Principles of Econ
            "course_description": course_description,  # This course covers ...
            "status": status,
            "subject": subject,
            "credits": credits,
        }
        return flask.jsonify(**context)


@collage.app.route('/api/agent/<question>', methods=['GET'])
def get_agent_response(question):
    pass
