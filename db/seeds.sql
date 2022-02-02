INSERT INTO company_db.departments (department_name)
VALUES ("Accounting"),
       ("Sales"),
       ("Programming"),
       ("Human Resources"),
       ("Customer Support");

INSERT INTO company_db.roles (title, salary, department_id)
VALUES ("Accountant", 80000, 1),
       ("Salesperson", 100000, 2),
       ("Programmer", 90000, 3),
       ("HR Rep", 70000, 4),
       ("Support Specialist", 70000, 5)
       
INSERT INTO company_db.employees (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 1, null),
       ("Amira", "Afzal", 2, 4),
       ("Christoper", "Lee", 3, null),
       ("Veronica", "Rodriguez", 4, 4),
       ("Igor", "Ivanov", 5, 3),
       ("Evan", "Manning", 1, null),
       ("Evangeline", "Velasquez", 2, 4),
       ("Safiyyah", "Black", 3, null),
       ("Deen", "Bishop", 4, 4),
       ("Elspeth", "MacGregor", 5, 3);