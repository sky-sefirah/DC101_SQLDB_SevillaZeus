-- CRUD Operations for Student Information System
-- Based on HTML forms and functionality in students.html, departments.html, and course.html
-- This file contains SQL queries for Create, Read, Update, Delete operations

-- ===========================================
-- STUDENTS TABLE CRUD OPERATIONS
-- Based on students.html form and table functionality
-- ===========================================

-- CREATE: Insert a new student (from student form)
INSERT INTO students (student_id, last_name, first_name, middle_initial, department, section, gender, birth_date, age, email, contact, address)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- READ: Get all students (for table display)
SELECT id, student_id, last_name, first_name, middle_initial, department, section, gender, email, contact
FROM students
ORDER BY last_name, first_name;

-- READ: Get student by ID (for editing)
SELECT * FROM students WHERE id = ?;

-- READ: Get student by student_id (for validation/editing)
SELECT * FROM students WHERE student_id = ?;

-- READ: Search students by name or ID (search functionality)
SELECT id, student_id, last_name, first_name, middle_initial, department, section, gender, email, contact
FROM students
WHERE student_id LIKE CONCAT('%', ?, '%')
   OR LOWER(last_name) LIKE LOWER(CONCAT('%', ?, '%'))
   OR LOWER(first_name) LIKE LOWER(CONCAT('%', ?, '%'))
ORDER BY last_name, first_name;

-- READ: Get students sorted by specific field (sort functionality)
SELECT id, student_id, last_name, first_name, middle_initial, department, section, gender, email, contact
FROM students
ORDER BY ? ASC;  -- Replace ? with column name

-- UPDATE: Update student information (edit functionality)
UPDATE students
SET student_id = ?, last_name = ?, first_name = ?, middle_initial = ?,
    department = ?, section = ?, gender = ?, birth_date = ?,
    age = ?, email = ?, contact = ?, address = ?
WHERE id = ?;

-- DELETE: Delete student by ID
DELETE FROM students WHERE id = ?;

-- ===========================================
-- DEPARTMENTS TABLE CRUD OPERATIONS
-- Based on departments.html functionality
-- ===========================================

-- CREATE: Insert a new department
INSERT INTO departments (code, name) VALUES (?, ?);

-- READ: Get all departments
SELECT id, code, name FROM departments ORDER BY name;

-- READ: Get department by ID
SELECT * FROM departments WHERE id = ?;

-- READ: Get department by code
SELECT * FROM departments WHERE code = ?;

-- UPDATE: Update department information
UPDATE departments SET code = ?, name = ? WHERE id = ?;

-- DELETE: Delete department by ID
DELETE FROM departments WHERE id = ?;

-- ===========================================
-- SECTIONS TABLE CRUD OPERATIONS
-- Based on departments.html section management
-- ===========================================

-- CREATE: Insert a new section (add section functionality)
INSERT INTO sections (name, department_id) VALUES (?, ?);

-- READ: Get all sections
SELECT s.id, s.name, d.name AS department_name
FROM sections s
LEFT JOIN departments d ON s.department_id = d.id
ORDER BY s.name;

-- READ: Get sections by department
SELECT s.id, s.name
FROM sections s
WHERE s.department_id = ?
ORDER BY s.name;

-- READ: Get section by ID
SELECT * FROM sections WHERE id = ?;

-- UPDATE: Update section information
UPDATE sections SET name = ?, department_id = ? WHERE id = ?;

-- DELETE: Delete section by ID
DELETE FROM sections WHERE id = ?;

-- ===========================================
-- SUBJECTS/COURSES TABLE CRUD OPERATIONS
-- Based on course.html form and table functionality
-- ===========================================

-- CREATE: Insert a new subject/course (from course form)
INSERT INTO subjects (code, title, units, department_id)
VALUES (?, ?, ?, ?);

-- READ: Get all subjects/courses (for table display)
SELECT s.id, s.code, s.title, s.units, d.name AS department_name
FROM subjects s
LEFT JOIN departments d ON s.department_id = d.id
ORDER BY s.code;

-- READ: Get subject by ID
SELECT * FROM subjects WHERE id = ?;

-- READ: Get subject by code
SELECT * FROM subjects WHERE code = ?;

-- READ: Get subjects by department
SELECT s.id, s.code, s.title, s.units
FROM subjects s
WHERE s.department_id = ?
ORDER BY s.code;

-- UPDATE: Update subject information
UPDATE subjects SET code = ?, title = ?, units = ?, department_id = ? WHERE id = ?;

-- DELETE: Delete subject by ID (delete functionality)
DELETE FROM subjects WHERE id = ?;

-- ===========================================
-- ADVANCED QUERIES FOR DASHBOARD/VIEWS
-- ===========================================

-- Get student count by department (for departments view)
SELECT d.name AS department, COUNT(s.id) AS student_count
FROM departments d
LEFT JOIN students s ON d.code = s.department
GROUP BY d.id, d.name
ORDER BY d.name;

-- Get student count by department and section
SELECT d.name AS department, s.section, COUNT(st.id) AS student_count
FROM departments d
LEFT JOIN students st ON d.code = st.department
LEFT JOIN sections s ON st.section = s.name
GROUP BY d.id, d.name, s.name
ORDER BY d.name, s.name;

-- Get subjects count by department
SELECT d.name AS department, COUNT(sub.id) AS subject_count
FROM departments d
LEFT JOIN subjects sub ON d.id = sub.department_id
GROUP BY d.id, d.name
ORDER BY d.name;

-- Search students with full details (for search results)
SELECT s.id, s.student_id, s.last_name, s.first_name, s.middle_initial,
       s.department, s.section, s.gender, s.email, s.contact,
       s.birth_date, s.age, s.address, s.created_at
FROM students s
WHERE s.student_id LIKE CONCAT('%', ?, '%')
   OR LOWER(CONCAT(s.last_name, ' ', s.first_name)) LIKE LOWER(CONCAT('%', ?, '%'))
   OR LOWER(s.last_name) LIKE LOWER(CONCAT('%', ?, '%'))
   OR LOWER(s.first_name) LIKE LOWER(CONCAT('%', ?, '%'))
ORDER BY s.last_name, s.first_name
LIMIT 50;

-- ===========================================
-- UTILITY QUERIES
-- ===========================================

-- Get distinct departments from students (for dropdown population)
SELECT DISTINCT department FROM students WHERE department IS NOT NULL AND department != '' ORDER BY department;

-- Get distinct sections from students (for dropdown population)
SELECT DISTINCT section FROM students WHERE section IS NOT NULL AND section != '' ORDER BY section;

-- Get department options for dropdowns
SELECT code, name FROM departments ORDER BY name;

-- Get section options for dropdowns
SELECT id, name FROM sections ORDER BY name;

-- Validate student_id uniqueness (for form validation)
SELECT COUNT(*) as count FROM students WHERE student_id = ? AND id != ?;

-- Validate subject code uniqueness (for form validation)
SELECT COUNT(*) as count FROM subjects WHERE code = ? AND id != ?;