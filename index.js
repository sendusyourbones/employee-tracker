// Require statements for functionality in this file
const inquirer = require('inquirer');
const connection = require('./config/connection.js');
const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
} = require('./queries.js');
const {
    validateDepartment
} = require('./validateInput.js');

// Function to ask for department name
function getDepartment() {
    inquirer.prompt([
        {
            name: 'deptName',
            message: 'Please enter the department name here:',
            type: 'input',
            validate: validateDepartment
        }
    ]).then((response) => {
        const { deptName } = response;
        addDepartment(deptName);
    });
}

// Function to initialize app with question prompt
function init() {
    inquirer.prompt([
        {
            name: 'action',
            message: 'What would you like to do?',
            type: 'list',
            choices: [
                {
                    name: 'View all departments',
                    value: 'viewDepartments'
                },
                {
                    name: 'View all roles',
                    value: 'viewRoles'
                },
                {
                    name: 'View all employees',
                    value: 'viewEmployees'
                },
                {
                    name: 'Add a department',
                    value: 'addDepartment'
                },
                {
                    name: 'Add a role',
                    value: 'addRole'
                },
                {
                    name: 'Add an employee',
                    value: 'addEmployee'
                },
                {
                    name: 'Update an employee role',
                    value: 'updateEmpRole'
                }
            ]
        }
    ]).then((response) => {
        console.log(response);

        switch (response.action) {
            case 'viewDepartments':
                viewDepartments();
                break;
            case 'viewRoles':
                viewRoles();
                break;
            case 'viewEmployees':
                viewEmployees();
                break;
            case 'addDepartment':
                getDepartment();
                break;
        }
            
    });
}

init();
