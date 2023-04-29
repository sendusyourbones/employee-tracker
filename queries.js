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
}

// Function with query to view all employees
const viewEmployees = async () => {
    const query = 'SELECT * FROM employee;';
    try {
        const [result] = await connection.query(query);
        console.table(result);
    } catch (error) {
        console.log(error);
    }
}

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
}

// Function to display current departments as options when adding a role
const showDeptList = async () => {
    const query = 'SELECT * FROM department;';
    try {
        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        return error;
    }
}

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
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    showDeptList,
    addRole,
};
