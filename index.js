const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRender");
const inquirer = require("inquirer");
const path = require("path")
const fs = require("fs")

const distDIR = path.resolve(__dirname, "dist");
const distPath = path.join(distDIR, "myteam.html");

let HTML = "";
const teamList = [];

const mgrQuestions = [
    {
        type: "input",
        message: "Manager's name?",
        name: "name"
    },
    {
        type: "input",
        message: "Employee ID?",
        name: "id"
    },
    {
        type: "input",
        message: "Email address?",
        name: "email"
    },
    {
        type: "input",
        message: "Office number?",
        name: "officeNumber"
    }
];

const engQuestions = [
    {
        type: "input",
        message: "Engineer's name?",
        name: "name"
    },
    {
        type: "input",
        message: "Employee ID?",
        name: "id"
    },
    {
        type: "input",
        message: "Email address?",
        name: "email"
    },
    {
        type: "input",
        message: "Github username?",
        name: "github"
    }
];

const internQuestions = [
    {
        type: "input",
        message: "Intern's name?",
        name: "name"
    },
    {
        type: "input",
        message: "Employee ID?",
        name: "id"
    },
    {
        type: "input",
        message: "Email address?",
        name: "email"
    },
    {
        type: "input",
        message: "Intern's school?",
        name: "school"
    }
];

const empInfo = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Employee's role?",
            name: "role",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ]).then(selection => {
        if (selection.role === "Manager") {
            mgrInfo();
        } else if (selection.role === "Engineer") {
            engInfo();
        } else {
            internInfo();
        };
        function mgrInfo() {
            inquirer.prompt(mgrQuestions)
            .then(selection => {
                const employee = new Manager(selection.name, selection.role, selection.id, selection.email, selection.officeNumber);
                teamList.push(employee);
                addEmployee();
            })
        };
        function engInfo() {
            inquirer.prompt(engQuestions)
            .then(selection => {
                const employee = new Engineer(selection.name, selection.role, selection.id, selection.email, selection.github);
                teamList.push(employee);
                addEmployee();
            })
        };
        function internInfo() {
            inquirer.prompt(internQuestions)
            .then(selection => {
                const employee = new Intern(selection.name, selection.role, selection.id, selection.email, selection.school);
                teamList.push(employee);
                addEmployee();
            })
        };
    })
};
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Add another employee?",
            name: "addEmployee"
        }
    ]).then(response => {
        if (response.addEmployee === true) {
            empInfo();
        } else {
            HTML += render(teamList);
            fs.writeFile(distPath, HTML, err => console.log(err))
            console.log("Team list has been created!")
            return;
        }
    })
};
empInfo();