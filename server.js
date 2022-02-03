const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql2 = require("mysql2");
require("dotenv").config();

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
    message: "Whice department does the role belong to?",
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
      const sql = "SELECT * FROM employees";
      // Query employees database
      db.query(sql, function (err, results) {
        console.table(results);
        prompt();
      });
    }

    if (response.initialQuestionAnswer === "add employee") {
    }

    if (response.initialQuestionAnswer === "update employee role") {
    }

    if (response.initialQuestionAnswer === "view all roles") {
      const sql = "SELECT * FROM roles";
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
      const sql = "SELECT * FROM departments";
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
