# Employee Management System

A simple Employee Management web application built using JavaScript and REST API integration.

##  Project Overview

This project demonstrates how JavaScript can interact with a REST API to perform employee management operations.

The application allows users to load, create, update, delete, search, filter, and sort employee data through a simple web interface.

##  Features

- Load employees from a REST API
- Create a new employee
- Update employee details
- Delete an employee
- Search employees by name
- Filter employees by department
- Combine search and department filtering
- Sort employees by name (A-Z / Z-A)
- Loading indicator while fetching data
- API error handling
- Form validation
- Empty search/filter result handling
- Responsive user interface

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- REST API
- JSON
- GitHub

## API

This project uses the [DummyJSON](https://dummyjson.com/) Users API for learning and API integration practice.

## CRUD Operations

| Operation | HTTP Method | Purpose |
|---|---|---|
| Read | GET | Load employees |
| Create | POST | Add an employee |
| Update | PUT | Update employee details |
| Delete | DELETE | Remove an employee |

##  Search, Filter & Sort

The application also provides:

- Employee name search
- Department filtering
- Combined search and department filtering
- Name sorting in ascending and descending order

##  How to Run

1. Clone or download this repository.
2. Open `index.html` in a web browser.
3. Click **Load Employees**.
4. Use the available options to manage and explore the employee data.

##  Project Structure

```text
employee-management-js/
│
├── index.html
├── style.css
├── script.js
└── README.md
