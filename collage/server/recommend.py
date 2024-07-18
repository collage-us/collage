import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

def extract_keywords(text):
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(text)
    return tfidf, tfidf_matrix

def recommend_classes(connection, curr_user_id, num_recommendations=16):
    # Get user info from db
    with connection.cursor(dictionary=True) as cursor:
        curr_user_query = """
            SELECT user_id, keywords
            FROM users
            WHERE user_id = %s
        """
        cursor.execute(curr_user_query, (curr_user_id,))
        curr_user = cursor.fetchone()

    # User does not exist
    if curr_user is None:
        return None

    user_keywords = curr_user['keywords']

    with connection.cursor(dictionary=True) as cursor:
        courses_query = """
            SELECT course_id, course_name, topic_description, course_description, instructor_id
            FROM courses
        """
        cursor.execute(courses_query)
        courses = cursor.fetchall()

    # Convert to DataFrame
    courses_df = pd.DataFrame(courses)
    courses_df['combined_descr'] = courses_df['topic_description'] + ' ' + courses_df['course_description']

    # Extract keywords and compute cosine similarities
    tfidf, tfidf_matrix = extract_keywords(courses_df['combined_descr'])
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf.transform([user_keywords]))

    with connection.cursor(dictionary=True) as cursor:
        following_query = """
            SELECT user_id_2
            FROM connections
            WHERE user_id_1 = %s
        """
        cursor.execute(following_query, (curr_user_id,))
        following_ids = cursor.fetchall()
        following_ids = [row['user_id_2'] for row in following_ids]

    with connection.cursor(dictionary=True) as cursor:
        course_ratings_query = """
            SELECT user_id, course_id, rating
            FROM course_ratings
        """
        cursor.execute(course_ratings_query)
        course_ratings = cursor.fetchall()
    course_ratings_df = pd.DataFrame(course_ratings)

    with connection.cursor(dictionary=True) as cursor:
        instructor_ratings_query = """
            SELECT user_id, instructor_id, rating
            FROM instructor_ratings
        """
        cursor.execute(instructor_ratings_query)
        instructor_ratings = cursor.fetchall()
    instructor_ratings_df = pd.DataFrame(instructor_ratings)

    # Calculate average course ratings by followed users
    friends_course_ratings = course_ratings_df[course_ratings_df['user_id'].isin(following_ids)]
    avg_course_ratings = friends_course_ratings.groupby('course_id')['rating'].mean()

    # Calculate average instructor ratings by followed users
    friends_instructor_ratings = instructor_ratings_df[instructor_ratings_df['user_id'].isin(following_ids)]
    avg_instructor_ratings = friends_instructor_ratings.groupby('instructor_id')['rating'].mean()

    # Merge ratings back to courses
    courses_df = courses_df.merge(avg_course_ratings, how='left', left_on='course_id', right_index=True, suffixes=('', '_course'))
    courses_df = courses_df.merge(avg_instructor_ratings, how='left', left_on='instructor_id', right_index=True, suffixes=('', '_instructor'))

    # Normalize ratings
    courses_df['rating_course'].fillna(0, inplace=True)
    courses_df['rating_instructor'].fillna(0, inplace=True)

    # Calculate final score:
    # TODO: change weights when needed
    # 50% user-course similarity, 25% course rating, 25% instructor rating
    user_course_weight = 0.5
    course_rating_weight = 0.25
    instructor_rating_weight = 1 - (user_course_weight + course_rating_weight)

    courses_df['final_score'] = (user_course_weight * cosine_similarities[:, 0] +
                                 course_rating_weight * courses_df['rating_course'] +
                                 instructor_rating_weight * courses_df['rating_instructor'])

    # Sort and get top recommendations
    top_courses = courses_df.nlargest(num_recommendations, 'final_score')

    return top_courses[['course_id']]
