CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    start_year INT,
    graduation_year INT,
    enrollment_date DATE,
    credits_completed INT,
    keywords TEXT,
    major VARCHAR(255),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE instructors (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(256) NOT NULL,
    department VARCHAR(256) NOT NULL,
    email VARCHAR(256) UNIQUE
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_code VARCHAR(50) NOT NULL,
    catalog_number INT NOT NULL,
    credit_hours INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    instructor_id INT NOT NULL, -- Changed to INT to match instructors table
    topic_description TEXT NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    course_description TEXT NOT NULL,
    class_topic VARCHAR(255) NOT NULL,
    enrollment_status VARCHAR(255),
    ai_img_url VARCHAR(255),
    FOREIGN KEY (instructor_id) REFERENCES instructors(instructor_id) ON DELETE CASCADE
);

CREATE TABLE course_ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    course_id INT,
    rating INT, -- a scale from 1 to 5, 5 being the best
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

CREATE TABLE instructor_ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    instructor_id INT,
    rating INT, -- a scale from 1 to 5, 5 being the best
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES instructors(instructor_id) ON DELETE CASCADE
);

CREATE TABLE connections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id_1 INT, -- user_id_1 follows user_id_2
    user_id_2 INT,
    FOREIGN KEY (user_id_1) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_2) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE saved_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    course_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

CREATE TABLE filters (
    filter_id INT AUTO_INCREMENT PRIMARY KEY,
    filter_cat VARCHAR(255) NOT NULL,
    filter_value VARCHAR(255) UNIQUE NOT NULL,
    filter_name VARCHAR(255) UNIQUE NOT NULL,
);