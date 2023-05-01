# Employee Tracker

## Description

This application enables organizations to store, view, and enter information about their departments, roles, and employees. It empowers non-technical users to interact with the employee database through clear and simple command line prompts instead of requiring them to write and run database queries on their own.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

This application uses the `mysql2` package to connect to the database, the `inquirer` package to handle the command line prompts, the `console.table` package to display the data in table format within the console, and the `dotenv` package to manage environmental variables. To install these packages, clone the repo, `cd` into it, then run the command `npm i`.

Before running the application, create the database by following these steps:
1. In the command line, `cd` into the repo
2. Enter `mysql -u root -p` and enter your password
3. Enter `source ./db/schemas.sql;`
4. Enter `exit`

## Usage

Watch this [demo video](https://drive.google.com/file/d/1WPv_s61SJScPg_9TXgimKMRwXdy77Mgh/view?usp=sharing) to see the application in action.

- `cd` into the repository in the command line and enter `node index`
- Use the up and down arrow keys to choose which action you would like to take
    - View all departments: The application will display a table with all departments in the database
    - View all roles: The application will display a table with all roles in the database
    - View all employees: The application will display a table with all employees in the database
    - Add a department: The application will prompt you for the department name and then add it to the database
    - Add a role: The application will prompt you for the role name, salary, and department, and then add the role to the database
    - Add an employee: The application will prompt you for the employee name, role, and manager, and then add the employee to the database
    - Update an employee role: The application will prompt you to choose an existing employee and an existing role, and then update the employee's role in the database
- After completing an action, the application will prompt you with the list of possible actions to take. Choose another action, or enter `Control-C` to exit the application.

## Credits

Packages used in the application:
- [mysql2](https://www.npmjs.com/package/mysql2)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [console.table](https://www.npmjs.com/package/console.table/v/0.10.0)

Tutorials:
- I referenced the stack overflow post [How to wait function to finish before asking new question with inquirer](https://stackoverflow.com/questions/73940750/how-to-wait-function-to-finish-before-asking-new-question-with-inquirer) to get help with the order in which my inquirer prompts were appearing
- I referenced the following sites for help with SQL joins:
    - [What Is a Self Join in SQL? An Explanation With Seven Examples](https://learnsql.com/blog/what-is-self-join-sql/) on learnSQL
        - This is used in the query in the viewEmployees() function to get the manager name from the employee id, both within the employee table
    - [How to Concat Two Columns Into One With the Existing Column Name in MySQL?](https://www.geeksforgeeks.org/how-to-concat-two-columns-into-one-with-the-existing-column-name-in-mysql/)
        - This is used in the query in the viewEmployees() function to display the manager full name rather than first and last name separately as they are stored in the database

## License

MIT License