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

// Function with query to add department
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

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
};
