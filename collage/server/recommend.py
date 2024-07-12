from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import pandas as pd
import numpy as np


def extract_keywords(text):
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(text)
    return tfidf, tfidf_matrix


def recommend_classes(connection, curr_user_id, num_recommendations=16):
    # get user info from db
    curr_user = None

    with connection.cursor(dictionary=True) as cursor:
        curr_user_query = """
            SELECT user_id, keywords
            FROM users
            WHERE user_id = %s
        """
        cursor.execute(curr_user_query, (curr_user_id,))
        curr_user = cursor.fetchone()

    # the user does not exist
    if curr_user == None:
        return None

    user_keywords = curr_user['keywords']

    with connection.cursor(dictionary=True) as cursor:
        courses_query = """
            SELECT course_id, course_name, topic_description, course_description
            FROM courses
        """
        cursor.execute(courses_query)
        courses = cursor.fetchall()

    # convert into pandas df to better align with data analysis
    user_df = pd.DataFrame([curr_user])
    courses_df = pd.DataFrame(courses)

    courses_df['keywords'] = courses_df['topic_description'] + \
                            ' ' + courses_df['course_description']

    _, tfidf_matrix = extract_keywords(courses_df['combined_descr'])
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

    # find the users that curr_user follows
    with connection.cursor(dictionary=True) as cursor:
        following_query = """
            SELECT user_id_2
            FROM connections
            WHERE user_id_1 = %s
        """
        cursor.execute(following_query, (curr_user_id,))
        following_ids = cursor.fetchall()

    with connection.cursor(dictionary=True) as cursor:
        course_ratings_query = """
            SELECT user_id, course_id, rating
            FROM course_ratings
        """
        cursor.execute(course_ratings_query)
        course_ratings = cursor.fetchall()
    course_ratings_df = pd.DataFrame(course_ratings)
    # find the courses that curr_user's followers
    # have rated, and their rating values
    friends_course_ratings_rows = course_ratings_df[course_ratings_df['user_id'].isin(following_ids)]
    friends_courses = friends_course_ratings_rows['course_id'].values
    friends_course_ratings = friends_course_ratings_rows['rating'].values

    with connection.cursor(dictionary=True) as cursor:
        instructor_ratings_query = """
            SELECT user_id, instructor_id, rating
            FROM instructor_ratings
        """
        cursor.execute(instructor_ratings_query)
        instructor_ratings = cursor.fetchall()
    instructor_ratings_df = pd.DataFrame(instructor_ratings)
    # find the courses that curr_user's followers
    # have rated, and their rating values
    friends_instructor_ratings_rows = instructor_ratings_df[instructor_ratings_df['user_id'].isin(following_ids)]
    friends_instructors = friends_instructor_ratings_rows['instructor_id'].values
    friends_instructors_ratings = friends_instructor_ratings_rows['rating'].values

    # predicted_ratings = cosine_similarities.dot(friends_ratings) / (cosine_similarities.sum(axis=1) + 1e-9)
    # recommended_class_ids = np.argsort(predicted_ratings)[::-1][:num_recommendations]
    # return courses_df.iloc[recommended_class_ids].to_dict(orient='records')