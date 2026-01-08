# DC101_SQLDB_SevillaZeus BSCS2C
The CCS Student Information System (SIS) is a web-based application designed to manage and organize student records for the College of Computer Studies (CCS). The system aims to provide an efficient way to store, retrieve, update, and manage student-related data such as personal information, department, year and section, and enrolled courses. 

Course: DC 101 – Web Development Level: 2nd Year
Project Title: CCS Student Information System
Mode: Individual Work Deadline: January 9, 2026
Objectives: Design and develop your own individual system that incorporates
both database management and web development skills learned throughout the course. You
will use MySQL for the backend database and HTML, CSS, and JavaScript for the frontend web
interface.

Instructions:
1. To access the File use Visual Studio Code and copy the code and open file via file explorer.
2. Download Extensions for HTML, CSS, Javascript, SQLTool, Node.js and LiveServer and MySQL
3. Open visual studio code terminal and input:
   PS D:\Visual Code Studio\Student Information System (Sevilla) - Copy> ^C
   PS D:\Visual Code Studio\Student Information System (Sevilla) - Copy> cd "d:\Visual Code Studio\Student Information System (Sevilla) - Copy" ; node server.js
or
   PS D:\Visual Code Studio\Student Information System (Sevilla) - Copy> cd "d:\Visual Code Studio\Student Information System (Sevilla) - Copy" ; node -c script.js
5. Run the Live Server on click of an html file to access CCS Student Information System Webpages
6. The default user id is: admin password: admin

Project Report:

INTRODUCTION

The CCS Student Information System (SIS) is a web-based application designed to manage and organize student records for the College of Computer Studies (CCS). The system aims to provide an efficient way to store, retrieve, update, and manage student-related data such as personal information, department, year and section, and enrolled courses.

The primary purpose of the system is to replace manual or spreadsheet-based record keeping with a centralized digital platform. This improves data accuracy, accessibility, and consistency while reducing redundancy and human error. The system also allows administrators to manage departments, sections, and course subjects in an organized manner.

Database Design: ER Diagram, Table Description, and Relationships

Entity Relationship Diagram
<img width="1021" height="1337" alt="Entity-Relationship Diagram" src="https://github.com/user-attachments/assets/23745dc1-855e-46ac-a08d-87e317121f4d" />

Relationships
•	A Department can have many Students
•	A Department can have many Year & Sections
•	A Student belongs to one Department and one Year & Section
•	A Course is independent and can be associated with departments if extended in the future

Web  Interface: Key Pages and Functionalities
1. Student Management Page
Features:
•	Displays a table of all students
•	Add, edit, and delete student records
•	Search students by name or student ID
•	Sort student data in ascending or descending order
•	Dropdown selections for Department (ACT / BSCS) and Year & Section
![student_page-table](https://github.com/user-attachments/assets/43a31d11-6360-4b8b-bc36-d81696b93601)
![student_page-form](https://github.com/user-attachments/assets/1445ad6a-1497-4208-a254-6451acf99eb6)

2. Department Management Page
Features:
•	Displays CCS departments (ACT and BSCS)
•	Filters students based on department
•	Manages Year & Section entries
•	Add and delete sections dynamically
•	Organized viewing of students per department
![department_page](https://github.com/user-attachments/assets/da615cd1-abeb-48f8-8f64-5c240ff56b2a)

3. Course Management Page
Features:
•	Displays list of courses in a table format
•	Add, edit, and delete course records
•	Stores course ID, name, description, and credit units
•	Provides a structured way to manage academic subjects
![course_page](https://github.com/user-attachments/assets/0f5caf88-5559-4243-8666-47242cdd6efd)

3. Setting Management Page
Features:
•	Controls Dark/Light Theme
•	Manage Acounts and Password
•	Logout and Clear LocalData
![setting_page-top](https://github.com/user-attachments/assets/54dbb6e6-9118-4a36-bf4e-2aa8ef712ba6)
![setting_page-bottom](https://github.com/user-attachments/assets/8b35bbf6-8ff7-4447-aac1-39d053f5660e)

4. Login and Home Page
Features:
•	Displays Login ID and Password
•	Displays Main Page for Student, Department, Course and Setting Redirectories
![login_page](https://github.com/user-attachments/assets/d0a2cca7-5758-4206-b7ed-87ddedccad8e)
![homepage](https://github.com/user-attachments/assets/2609409a-3599-46d2-8c75-c86ba72177e2)

Challenges and Learning:

1. Challenges Encoutered

One of the main challenges encountered was managing data relationships between students, departments, and year sections while ensuring data consistency. Another challenge was implementing search and sorting functionality efficiently using JavaScript, compiling and sorting the students html information data in each department and year & section in department html and using SQL. Designing a clean and user-friendly interface while maintaining functionality also required careful planning.

2. Learned Outcomes

Through this project, significant learning was gained in:
•	Designing relational databases and ER diagrams
•	Implementing CRUD (Create, Read, Update, Delete) operations
•	Using HTML, CSS, and JavaScript for dynamic web applications
•	Managing data persistence using localStorage
•	Improving UI/UX design principles
•	Understanding how real-world information systems are structured

This project enhanced problem-solving skills and provided practical experience in developing a functional web-based information system.

3. Conclusion

The CCS Student Information System successfully demonstrates how a web-based application can efficiently manage academic records. It serves as a strong foundation for future improvements such as database integration, authentication, and role-based access control. The project highlights the importance of proper system design, data organization, and user-centered development.

