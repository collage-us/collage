from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import pandas as pd
import numpy as np


def extract_keywords(text):
    # extract keywords
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(text)
    return tfidf, tfidf_matrix

def recommend_classes(user_id, num_recommendations=5):
    # get user preferences
    user_preferences = users[users['user_id'] == user_id]['preferences'].values[0]

    classes['combined_descr'] = classes['TopicDescr'] + ' ' + classes['CourseDescr']

    tfidf, tfidf_matrix = extract_keywords(classes['combined_descr'])

    # calculate cosine similarity
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

    # collaborative filtering
    user_interactions = interactions[interactions['user_id'] == user_id]
    user_class_ids = user_interactions['class_id'].values
    user_ratings = user_interactions['rating'].values

    # predict ratings for all classes
    predicted_ratings = cosine_similarities.dot(user_ratings) / (cosine_similarities.sum(axis=1) + 1e-9)

    # sort classes by predicted ratings
    recommended_class_ids = np.argsort(predicted_ratings)[::-1][:num_recommendations]

    return classes.iloc[recommended_class_ids]