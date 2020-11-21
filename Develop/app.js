const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");
const { createInflate } = require("zlib");
const Employee = require("./lib/Employee");

//creating a global employee variable
var createdEmployee = null;

//creating the team member array
const teamMember = [];

//obtaining user's role
function sortRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Welcome to TeamRoster! What is your role in the company?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(function (response) {
      switch (response.role) {
        case "Manager":
          createManager();
          break;
        case "Engineer":
          createEngineer();
          break;
        case "Intern":
          createIntern();
          break;
        default:
          console.log(`You must choose a role.`);
      }
    });
}

sortRole();

//manager flow
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter your full name.",
        default: "firstName lastName",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter your employer id no.",
        default: "email@address.com",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter your email address",
        default: "email@address.com",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter your office phone number",
        default: "format as you want it displayed",
      },
    ])
    .then((response) => {
      const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      teamMember.push(manager);
      console.log(teamMember);
      anotherOne();
    });
}

//determining if new team members need to be added
function anotherOne() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseMember",
        message: "which type of team memeber would you like to add?",
        choices: ["Engineer", "Intern", "I'm finished adding team members"],
      },
    ])
    .then(function (response) {
      switch (response.chooseMember) {
        case "Engineer":
          createEngineer();
          break;
        case "Intern":
          createIntern();
          break;
        case "I'm finished adding team members":
          createTeam();
      }
    });
}

//adds an engineer
function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Engineer's name.",
        default: "firstName lastName",
      },
      {
        type: "input",
        name: "id",
        message: "Engineer's employer id no.",
        default: "employee number",
      },
      {
        type: "input",
        name: "email",
        message: "Engineer's email address",
        default: "email@address.com",
      },
      {
        type: "input",
        name: "github",
        message: "Engineer's gitHub profile link",
        default: "https://github.com/username",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      createdEmployee = engineer;
      console.log();
      if (response.role === "manager") {
        teamMember.push(createdEmployee);
        anotherOne();
      } else {
        createEmployee();
      }
    });
}

//adds an intern
function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Intern's name.",
        default: "firstName lastName",
      },
      {
        type: "input",
        name: "id",
        message: "Intern's employer id no.",
        default: "employee number",
      },
      {
        type: "input",
        name: "email",
        message: "Intern's email address",
        default: "email@address.com",
      },
      {
        type: "input",
        name: "school",
        message: "Intern's school?",
        default: "school name",
      },
    ])
    .then((response) => {
      const intern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      createdEmployee = intern;
      console.log(createdEmployee);
      if (response.role === "manager") {
        teamMember.push(createdEmployee);
        anotherOne();
      } else {
        createEmployee();
      }
    });
}
function createEmployee() {
  fs.appendFileSync(
    `./createdEmployees/employee.js`,
    JSON.stringify(createdEmployee),
    "utf8"
  );
  console.log(
    "Thank you for entering your information. It has been added to the file."
  );
}

// creates the team in dir_output
function createTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  } else {
    fs.writeFileSync(outputPath, render(teamMember), "utf8");
  }
}
//renders the html
render(teamMember);

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
