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

    tfidf, tfidf_matrix = extract_keywords(courses_df['combined_descr'])

    # Compute cosine similarity
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

    with connection.cursor(dictionary=True) as cursor:
        following_query = """
            SELECT user_id_2
            FROM connections
            WHERE user_id_1 = %s
        """
        cursor.execute(following_query, (curr_user_id,))
        following_ids = cursor.fetchall()
        

    # Collaborative filtering (dummy implementation for illustration)
    user_interactions = interactions[interactions['user_id'] == curr_user_id]
    user_class_ids = user_interactions['class_id'].values
    user_ratings = user_interactions['rating'].values

    # Predict ratings for all classes (dummy prediction)
    predicted_ratings = cosine_similarities.dot(user_ratings) / (cosine_similarities.sum(axis=1) + 1e-9)

    # Sort classes by predicted ratings
    recommended_class_ids = np.argsort(predicted_ratings)[::-1][:num_recommendations]

    return courses_df.iloc[recommended_class_ids].to_dict(orient='records')