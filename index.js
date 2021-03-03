const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path")
const fs = require("fs")




const mgrQuestions = [
    {
        type: "input",
        message: "Manager's name?",
        name: "name"
    },
    {
        type: "input",
        message: "Employee ID?",
        name: "empId"
    },
    {
        type: "input",
        message: "Email address?",
        name: "email"
    },
    {
        type: "input",
        message: "Office number?",
        name: "ofcNumber"
    }
]

const engQuestions = [
    {
        type: "input",
        message: "Engineer's name?",
        name: "name"
    },
    {
        type: "input",
        message: "Employee ID?",
        name: "empId"
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
        type: "input",
        message: "Employee ID?",
        name: "empId"
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