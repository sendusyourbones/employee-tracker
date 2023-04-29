// Require statements for functionality in this file
const inquirer = require('inquirer');
const connection = require('./config/connection.js');
const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    showDeptList,
    addRole,
    showRoleList,
    showEmployeeList,
    addEmployee,
} = require('./queries.js');
const {
    validateNotNull,
    validateSalary,
} = require('./validateInput.js');

// Function to ask for department name
function getDepartment() {
    inquirer.prompt([
        {
            name: 'deptName',
            message: 'Please enter the department name here:',
            type: 'input',
            validate: validateNotNull
        }
    ]).then((response) => {
        const { deptName } = response;
        addDepartment(deptName);
    });
}

// Function to ask for role information
function getRole() {
    inquirer.prompt([
        {
            name: 'roleName',
            message: 'Please enter the role name here:',
            type: 'input',
            validate: validateNotNull
        },
        {
            name: 'salary',
            message: 'Please enter the salary here:',
            type: 'input',
            validate: validateSalary
        },
        {
            name: 'department',
            message: 'Which department does the role belong to?',
            type: 'list',
            choices: showDeptList
        }
    ]).then((response) => {
        console.log(response);
        const {
            roleName,
            salary,
            department
        } = response;
        addRole(roleName, salary, department);
    });
}

// Function to ask for employee information
function getEmployee() {
    inquirer.prompt([
        {
            name: 'firstName',
            message: 'Please enter the first name:',
            type: 'input',
            validate: validateNotNull
        },
        {
            name: 'lastName',
            message: 'Please enter the last name:',
            type: 'input',
            validate: validateNotNull
        },
        {
            name: 'role',
            message: 'Which role does the employee hold?',
            type: 'list',
            choices: showRoleList
        },
        {
            name: 'manager',
            message: 'Who is their manager?',
            type: 'list',
            choices: showEmployeeList
        }
    ]).then((response) => {
        console.log(response);
        const {
            firstName,
            lastName,
            role,
            manager
        } = response;
        addEmployee(firstName, lastName, role, manager);
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
            case 'addRole':
                getRole();
                break;
            case 'addEmployee':
                getEmployee();
                break;
        }
    });
}

init();
