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

const teamMember = [];

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message:
          "Welcome, Manager, to TeamRoster! Please enter your full name.",
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
      manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );

      teamMember.push(manager);
      console.log(manager);
      anotherOne();
    });
}

function anotherOne() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseMember",
        message: "which type of team member would you like to add?",
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
        default: "https:",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );

      teamMember.push(engineer);
      console.log(engineer);
      anotherOne();
    });
}

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

      teamMember.push(intern);
      console.log(intern);
      anotherOne();
    });
}
createManager();

function createTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  } else {
    fs.writeFileSync(outputPath, render(teamMember), "utf8");
  }
}

render(teamMember);
