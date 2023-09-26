# Employee Database Management CLI Application

A command-line application for managing a company's employee database using Node.js, Inquirer, and MySQL.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This command-line application allows you to manage an employee database for a company. You can view departments, roles, employees, add new departments, roles, employees, and update employee roles easily.

## Features

- View all departments with department names and IDs.
- View all roles with job titles, role IDs, department names, and salaries.
- View all employees with employee IDs, first names, last names, job titles, departments, salaries, and manager names.
- Add a new department to the database.
- Add a new role to the database, specifying the title, salary, and department.
- Add a new employee to the database, providing their first name, last name, role, and manager's name.
- Update an employee's role by selecting the employee and specifying their new role.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MySQL server installed and running
- MySQL Workbench or another MySQL client for database management
- Database schema and tables set up (see database setup instructions below)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/trackstarr/Employee-Tracker.git)https://github.com/trackstarr/Employee-Tracker.git
   ```
   
   Change to the project directory:
   
  ```bash
2. cd employee-database-cli
   ```

Install dependencies:

  ```bash
2.npm install
   ```

3. Set up your MySQL database:

Create a MySQL database and schema for your project.
Import the provided SQL schema into your database using a tool like MySQL Workbench or by running the SQL script provided in the db/schema.sql file.
Configure the application:

Open the app.js file and modify the MySQL connection settings (host, user, password, and database) to match your MySQL server configuration.


4. Start the application:

  ```bash
node app.js
   ```
Usage
Run the application using node app.js in your terminal.
Use the arrow keys to navigate through the menu and select the action you want to perform.
Follow the prompts to add or update departments, roles, and employees.
Use the provided options to view the employee database.
Screenshots


Contributing
Contributions are welcome! Please feel free to open an issue or submit a pull request to improve this project
