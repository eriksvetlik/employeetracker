INSERT INTO departments (department_name)
VALUES ("Accounting"),
       ("Sales"),
       ("Programming"),
       ("Human Resources"),
       ("Customer Support");

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 80000, 1),
       ("Salesperson", 100000, 2),
       ("Programmer", 90000, 3),
       ("HR Rep", 70000, 4),
       ("Support Specialist", 70000, 5);
       
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Elliot", "Smith", 1),
       ("Amira", "Afzal", 2),
       ("Christoper", "Lee", 3),
       ("Veronica", "Rodriguez", 4),
       ("Igor", "Ivanov", 5),
       ("Evan", "Manning", 1),
       ("Evangeline", "Velasquez", 2),
       ("Safiyyah", "Black", 3),
       ("Deen", "Bishop", 4),
       ("Elspeth", "MacGregor", 5);

UPDATE employees
SET manager_id = 1
WHERE role_id = 1;

UPDATE employees
SET manager_id = 2
WHERE role_id = 2;