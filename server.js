const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql2 = require("mysql2");
require("dotenv").config();

const addEmployee = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "EmployeeFirstName",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "EmployeeLastName",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    choices: [
      "Accountant",
      "Salesperson",
      "Programmer",
      "HR Rep",
      "Support Specialist",
    ],
    name: "EmployeeRole",
  },
  {
    type: "input",
    message: "Who is the employee's manager?",
    name: "EmployeeManager",
  },
];

const addDepartment = [
  {
    type: "input",
    message: "What is the department's name?",
    name: "departmentName",
  },
];

const addRole = [
  {
    type: "input",
    message: "What is the roles's name?",
    name: "roleName",
  },
  {
    type: "input",
    message: "What is the roles's salary?",
    name: "roleSalary",
  },
  {
    type: "list",
    message: "Which department does the role belong to?",
    choices: [
      "Accounting",
      "Sales",
      "Programming",
      "Human Resources",
      "Customer Support",
    ],
    name: "roleDepartment",
  },
];

const initialQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "view all employees",
      "add employee",
      "update employee role",
      "view all roles",
      "add role",
      "view all departments",
      "add department",
      "quit",
    ],
    name: "initialQuestionAnswer",
  },
];

const updateEmployee = [
  {
    type: "list",
    message: "Which employee's role would you like to update?",
    choices: [
      "Elliot",
      "Amira",
      "Christoper",
      "Veronica",
      "Igor",
      "Evan",
      "Evangeline",
      "Safiyyah",
      "Deen",
      "Elspeth",
    ],
    name: "EmployeeName",
  },
  {
    type: "list",
    message: "What's their new role?",
    choices: [
      "Accountant",
      "Salesperson",
      "Programmer",
      "HR Rep",
      "Support Specialist",
    ],
    name: "EmployeeNewRole",
  },
];

// Connect to database
const db = mysql2.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

const prompt = () => {
  inquirer.prompt(initialQuestion).then((response) => {
    if (response.initialQuestionAnswer === "view all employees") {
      const sql = `SELECT e.id AS ID, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS Title, d.department_name AS Department, r.salary AS Salary, m.first_name AS Manager 
                  FROM employees e 
                  INNER JOIN roles r ON e.role_id = r.id 
                  INNER JOIN departments d ON d.id = r.department_id 
                  LEFT JOIN employees m ON e.manager_id = m.id;`;
      // Query employees database
      db.query(sql, function (err, results) {
        console.table(results);
        prompt();
      });
    }

    if (response.initialQuestionAnswer === "add employee") {
      inquirer.prompt(addEmployee).then((response) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id) 
                    SELECT ?, ?, id
                    FROM roles
                    WHERE title = ?;`;
        const EmployeeFirstName = response.EmployeeFirstName;
        const EmployeeLastName = response.EmployeeLastName;
        const EmployeeRole = response.EmployeeRole;
        // Adds employee to the database
        db.query(
          sql,
          [EmployeeFirstName, EmployeeLastName, EmployeeRole],
          function (err, results) {
            console.log(`${EmployeeFirstName} has been added!`);
            prompt();
          }
        );
      });
    }

    if (response.initialQuestionAnswer === "update employee role") {
      inquirer.prompt(updateEmployee).then((response) => {
        const sql = `UPDATE employees
                    SET role_id = (
                      SELECT id
                      FROM roles
                      WHERE title = ?
                    )
                    WHERE first_name = ?;`;
        const EmployeeNewRole = response.EmployeeNewRole;
        const EmployeeName = response.EmployeeName;
        // Update employee's role in the database
        db.query(sql, [EmployeeNewRole, EmployeeName], function (err, results) {
          console.log(
            `${EmployeeName}'s role was changed to ${EmployeeNewRole}!`
          );
          prompt();
        });
      });
    }

    if (response.initialQuestionAnswer === "view all roles") {
      const sql = `SELECT r.title AS Title, r.id AS ID, d.department_name AS Department, r.salary AS Salary
                  FROM roles r
                  INNER JOIN departments d
                  ON r.id = d.id`;
      // Query roles database
      db.query(sql, function (err, results) {
        console.table(results);
        prompt();
      });
    }

    if (response.initialQuestionAnswer === "add role") {
      inquirer.prompt(addRole).then((response) => {
        const sql = `INSERT INTO roles (title, salary, department_id) 
                    SELECT ?, ?, id
                    FROM departments
                    WHERE department_name = ?`;
        const roleName = response.roleName;
        const roleSalary = response.roleSalary;
        const roleDepartment = response.roleDepartment;
        // Adds role to the database
        db.query(
          sql,
          [roleName, roleSalary, roleDepartment],
          function (err, results) {
            console.log(`${roleName} role added!`);
            prompt();
          }
        );
      });
    }

    if (response.initialQuestionAnswer === "view all departments") {
      const sql =
        "SELECT id AS ID, department_name AS Department FROM departments";
      // Query departments database
      db.query(sql, function (err, results) {
        console.table(results);
        prompt();
      });
    }

    if (response.initialQuestionAnswer === "add department") {
      inquirer.prompt(addDepartment).then((response) => {
        const sql = `INSERT INTO departments (department_name) VALUES (?)`;
        const departmentName = response.departmentName;
        // Adds department to the database
        db.query(sql, departmentName, function (err, results) {
          console.log(`${departmentName} department added!`);
          prompt();
        });
      });
    }

    if (response.initialQuestionAnswer === "quit") {
      console.log("goodbye!");
      process.exit(0);
    }
  });
};

prompt();
