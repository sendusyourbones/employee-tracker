// Require statements for functionality in this file
const connection = require('./config/connection.js');
const cTable = require('console.table');

// Function with query to view all departments
const viewDepartments = async () => {
    const query = 'SELECT * FROM department;';
    try {
        const [result] = await connection.query(query);
        console.table(result);
    } catch (error) {
        console.log(error);
    }
};

// Function with query to view all roles
const viewRoles = async () => {
    const query = 'SELECT * FROM role;';
    try {
        const [result] = await connection.query(query);
        console.table(result);
    } catch (error) {
        console.log(error);
    }
};

// Function with query to view all employees
const viewEmployees = async () => {
    const query = 'SELECT * FROM employee;';
    try {
        const [result] = await connection.query(query);
        console.table(result);
    } catch (error) {
        console.log(error);
    }
};

// Function to add department to database
const addDepartment = async (name) => {
    try {
        const query = 'INSERT INTO department (name) VALUES (?);';
        const [result] = await connection.query(query, [name]);

        const resultQuery = `SELECT * FROM department WHERE id = ${result.insertId};`;
        const [addedDept] = await connection.query(resultQuery);

        console.log(`Added ${addedDept[0].name} to the database`);
    } catch (error) {
        console.log(error);
    }
};

// Function to display current departments as options when adding a role
const showDeptList = async () => {
    const query = 'SELECT * FROM department;';
    try {
        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        return error;
    }
};

// Function to add role to database
const addRole = async (title, salary, department) => {
    try {
        const deptIdQuery = `SELECT id FROM department WHERE name = '${department}';`;
        const [deptIdResult] = await connection.query(deptIdQuery);

        const addDeptQuery = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${deptIdResult[0].id});`;
        const [addDeptResult] = await connection.query(addDeptQuery);

        const addedRoleQuery = `SELECT * FROM role WHERE id = ${addDeptResult.insertId};`;
        const [addedRole] = await connection.query(addedRoleQuery);

        console.log(`Added ${addedRole[0].title} to the database`);
    } catch (error) {
        console.log(error);
    }
};

// Function to display current roles as options when adding an employee
const showRoleList = async () => {
    const query = 'SELECT * FROM role;';
    try {
        const [result] = await connection.query(query);
        let rolesArray = [];
        result.forEach((element) => {
            const roleObject = {};
            roleObject.name = element.title;
            roleObject.value = element.id;
            rolesArray.push(roleObject);
        });
        return rolesArray;
    } catch (error) {
        return error;
    }
};

// Function to display current employees as manager options when adding an employee
const showEmployeeList = async (currentAnswers) => {
    const query = 'SELECT * FROM employee;';
    try {
        const [result] = await connection.query(query);
        let employeesArray = [];
        if (currentAnswers.firstName) {
            employeesArray[0] = {
                name: 'None',
                value: null
            }
        }
        result.forEach((element) => {
            const employeeObject = {};
            employeeObject.name = `${element.first_name} ${element.last_name}`;
            employeeObject.value = element.id;
            employeesArray.push(employeeObject);
        });
        return employeesArray;
    } catch (error) {
        return error;
    }
};

// Function to add employee to database
const addEmployee = async (firstName, lastName, roleId, managerId) => {
    try {
        const addEmployeeQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId});`;
        const [addEmployeeResult] = await connection.query(addEmployeeQuery);

        const addedEmployeeQuery = `SELECT * FROM employee WHERE id = ${addEmployeeResult.insertId};`;
        const [addedEmployee] = await connection.query(addedEmployeeQuery);

        console.log(`Added ${addedEmployee[0].first_name} ${addedEmployee[0].last_name} to the database`);
    } catch (error) {
        console.log(error);
    }
};

// Function to update an employee's role
const updateEmployeeRole = async (employeeId, roleId) => {
    try {
        const updateQuery = `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId};`;
        const [updateResult] = await connection.query(updateQuery);
        
        const updatedEmployeeQuery = `SELECT * FROM employee WHERE id = ${employeeId};`;
        const [updatedEmployee] = await connection.query(updatedEmployeeQuery);

        console.log(`Updated ${updatedEmployee[0].first_name} ${updatedEmployee[0].last_name}'s role`);
    } catch (error) {
        console.log(error);
    }  
};

module.exports = {
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
};
