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
        type: "number",
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
]

const engQuestions = [
    {
        type: "input",
        message: "Engineer's name?",
        name: "name"
    },
    {
        type: "number",
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
]

const internQuestions = [
    {
        type: "input",
        message: "Intern's name?",
        name: "name"
    },
    {
        type: "number",
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
]

const empInfo = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Employee's role?",
            name: "role",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ]).then(answer => {
        if (answer.role === "Manager") {
            mgrInfo();
        } else if (answer.role === "Engineer") {
            engInfo();
        } else {
            internInfo();
        }
        function mgrInfo() {
            inquirer.prompt(mgrQuestions)
            .then(answer => {
                const employee = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
                teamList.push(employee);
                addEmployee();
            })
        }
        function engInfo() {
            inquirer.prompt(engQuestions)
            .then(answer => {
                const employee = new Engineer(answer.name, answer.id, answer.email, answer.github);
                teamList.push(employee);
                addEmployee();
            })
        }
        function internInfo() {
            inquirer.prompt(internQuestions)
            .then(answer => {
                const employee = new Intern(answer.name, answer.id, answer.email, answer.school);
                teamList.push(employee);
                addEmployee();
            }).catch(err => console.log(err));
        }
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
            console.log("Yes.");
            empInfo();
        } else {
            HTML += render(teamList);
            fs.writeFile(distPath, HTML, err => console.log(err))
            console.log("Team list has been created!");
            return;
        }
    })
};
empInfo();