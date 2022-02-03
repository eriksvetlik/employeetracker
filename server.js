const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql2 = require("mysql2");
require("dotenv").config();

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
    name: "initialQuestion",
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
    if (response.initialQuestion === "view all employees") {
      // Query employees database
      db.query("SELECT * FROM employees", function (err, results) {
        console.table(results);
        prompt();
      });
    }

    if (response.initialQuestion === "add employee") {
    }

    if (response.initialQuestion === "update employee role") {
    }

    if (response.initialQuestion === "view all roles") {
      // Query roles database
      db.query("SELECT * FROM roles", function (err, results) {
        console.table(results);
        prompt();
      });
    }

    if (response.initialQuestion === "add role") {
    }

    if (response.initialQuestion === "view all departments") {
      // Query departments database
      db.query("SELECT * FROM departments", function (err, results) {
        console.table(results);
        prompt();
      });
    }

    if (response.initialQuestion === "add department") {
    }

    if (response.initialQuestion === "quit") {
      console.log("goodbye!");
      process.exit(0);
    }
  });
};

prompt();
