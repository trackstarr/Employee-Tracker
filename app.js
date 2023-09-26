const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employee_db',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
  startApp();
});

// Function to start the application
function startApp() {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
          
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          console.log('Goodbye!');
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO department (name) VALUES (?)';
      connection.query(query, [answers.name], (err) => {
        if (err) throw err;
        console.log('Department added successfully!');
        startApp(); // Return to the main menu
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Enter the salary for this role:',
      },
      {
        type: 'number',
        name: 'department_id',
        message: 'Enter the department ID for this role:',
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      connection.query(query, [answers.title, answers.salary, answers.department_id], (err) => {
        if (err) throw err;
        console.log('Role added successfully!');
        startApp(); // Return to the main menu
      });
    });
}


function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:",
      },
      {
        type: 'number',
        name: 'role_id',
        message: "Enter the employee's role ID:",
      },
      {
        type: 'number',
        name: 'manager_id',
        message: "Enter the employee's manager's ID:",
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      connection.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err) => {
        if (err) throw err;
        console.log('Employee added successfully!');
        startApp(); // Return to the main menu
      });
    });
}

function updateEmployeeRole() {
  // First, query the database to get a list of employees
  connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee', (err, employees) => {
    if (err) throw err;

    // Prompt the user to select an employee to update
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select an employee to update their role:',
          choices: employees.map((employee) => ({
            name: employee.employee_name,
            value: employee.id,
          })),
        },
        {
          type: 'number',
          name: 'new_role_id',
          message: 'Enter the new role ID for this employee:',
        },
      ])
      .then((answers) => {
        const { employee_id, new_role_id } = answers;
        const updateQuery = 'UPDATE employee SET role_id = ? WHERE id = ?';

        connection.query(updateQuery, [new_role_id, employee_id], (err) => {
          if (err) throw err;
          console.log('Employee role updated successfully!');
          startApp(); // Return to the main menu
        });
      });
  });
}


function viewAllDepartments() {
  const query = 'SELECT id, name FROM department';
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp(); // Return to the main menu
  });
}

function viewAllRoles() {
  const query = `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id;
  `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp(); // Return to the main menu
  });
}

function viewAllEmployees() {
  const query = `
    SELECT
      employee.id,
      employee.first_name,
      employee.last_name,
      role.title AS job_title,
      department.name AS department,
      role.salary,
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id;
  `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp(); // Return to the main menu
  });
}
