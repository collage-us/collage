PRAGMA foreign_keys = ON;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    start_year INT,
    graduation_year INT,
    enrollment_date DATE,
    credits_completed INT,
    major VARCHAR(255),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(50) NOT NULL UNIQUE,
    credit_hours INT NOT NULL,
    location VARCHAR(255),
    instructor_name VARCHAR(255),
    topic_description TEXT,
    course_name VARCHAR(255) NOT NULL,
    course_description TEXT,
    class_topic VARCHAR(255)
);

CREATE TABLE instructors(
  instructor_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(256) NOT NULL,
  department VARCHAR(256) NOT NULL,
  email VARCHAR(256) UNIQUE
);