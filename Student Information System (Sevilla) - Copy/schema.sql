-- Schema for CCS Student Information System
-- Run with: mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS sis_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sis_db;

-- Departments
CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(32) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL
);

-- Sections (year/section)
CREATE TABLE IF NOT EXISTS sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  department_id INT DEFAULT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Subjects / Courses
CREATE TABLE IF NOT EXISTS subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(64) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  units INT DEFAULT 0,
  department_id INT DEFAULT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Students
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(64) NOT NULL UNIQUE,
  last_name VARCHAR(128) NOT NULL,
  first_name VARCHAR(128) NOT NULL,
  middle_initial VARCHAR(16),
  department VARCHAR(64),
  section VARCHAR(64),
  gender VARCHAR(16),
  birth_date DATE DEFAULT NULL,
  age INT DEFAULT NULL,
  email VARCHAR(255),
  contact VARCHAR(64),
  address VARCHAR(512),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional sample data
INSERT IGNORE INTO departments (code, name) VALUES ('ACT','Accounting'), ('BSCS','Computer Science');
INSERT IGNORE INTO sections (name, department_id) VALUES ('1A', 2), ('1B', 2), ('2A', 2);
INSERT IGNORE INTO subjects (code, title, units, department_id) VALUES ('CS101','Intro to Programming',3,2);
