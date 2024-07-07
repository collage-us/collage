PRAGMA foreign_keys = ON;

CREATE TABLE courses(

);

CREATE TABLE users(

);

CREATE TABLE instructors(
  instructor_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(256) NOT NULL,
  department VARCHAR(256) NOT NULL,
  email VARCHAR(256) UNIQUE
);