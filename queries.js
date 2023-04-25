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

module.exports = {
    viewDepartments
};
