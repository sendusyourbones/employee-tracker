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
    updateEmployeeRole,
} = require('./queries.js');
const {
    validateNotNull,
    validateSalary,
} = require('./validateInput.js');

// Function to ask for department name
const getDepartmentInfo = async () => {
    const response = await inquirer.prompt([
        {
            name: 'deptName',
            message: 'Please enter the department name here:',
            type: 'input',
            validate: validateNotNull
        }
    ]);
    const { deptName } = response;
    await addDepartment(deptName);
}

// Function to ask for role information
const getRoleInfo = async () => {
    const response = await inquirer.prompt([
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
    ]);

    const {
        roleName,
        salary,
        department
    } = response;

    await addRole(roleName, salary, department);
}

// Function to ask for employee information
const getEmployeeInfo = async () => {
    const response = await inquirer.prompt([
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
    ]);

    const {
        firstName,
        lastName,
        role,
        manager
    } = response;

    await addEmployee(firstName, lastName, role, manager);
}

// Function to ask which employee's role to update
const showEmployeeChoices = async () => {
    const response = await inquirer.prompt([
        {
            name: 'employeeId',
            message: "Which employee's role do you want to update?",
            type: 'list',
            choices: showEmployeeList
        },
        {
            name: 'roleId',
            message: 'Which role do you want to assign to the selected employee?',
            type: 'list',
            choices: showRoleList
        }
    ]);
    
    const {
        employeeId,
        roleId
    } = response;
    
    await updateEmployeeRole(employeeId, roleId);
}

// Function to initialize app with question prompt
const init = async () => {
    const response = await inquirer.prompt([
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
    ]);

    switch (response.action) {
        case 'viewDepartments':
            await viewDepartments();
            break;
        case 'viewRoles':
            await viewRoles();
            break;
        case 'viewEmployees':
            await viewEmployees();
            break;
        case 'addDepartment':
            await getDepartmentInfo();
            break;
        case 'addRole':
            await getRoleInfo();
            break;
        case 'addEmployee':
            await getEmployeeInfo();
            break;
        case 'updateEmpRole':
            await showEmployeeChoices();
            break;
    }
    init();
}

init();
