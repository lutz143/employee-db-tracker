const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    // TODO: Add MySQL Password
    password: 'd3velop23',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

const dbSearch = (sql) => {
  return new Promise(function(resolve, reject){
    db.query(
        sql, 
        function(err, rows){                                                
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        }
    )})
}

let deptList = [];
let roleList = [];
let managerList = [];
let employeeList = [];

const deptSelection = () => {  
  const sql = 'SELECT department_name FROM department GROUP BY department_name ORDER BY department_name'
  return dbSearch(sql)
  .then(returnData => {
    for(var key in returnData) {      
      let dept = returnData[key]["department_name"];
      deptList.push(dept);      
    }
    // console.log(deptList);
  })
}

const roleSelection = () => {
  const sql = 'SELECT role_title FROM roles GROUP BY role_title ORDER BY role_title'
  return dbSearch(sql)
  .then(returnData => {
    for(var key in returnData) {
      let role = returnData[key]["role_title"];
      roleList.push(role);      
    }
    // console.log(roleList);
  })
}

const managerSelection = () => {  
  const sql = 'SELECT roles.role_title, employee.first_name, employee.last_name, concat(employee.first_name," ",employee.last_name) AS manager_name FROM roles LEFT JOIN employee ON roles.role_id = employee.fk_role_id WHERE (((roles.role_title) LIKE \'%Lead%\')) OR (((roles.role_title) LIKE \'%Manager%\')) ORDER BY manager_name'
  return dbSearch(sql)
  .then(returnData => {
    for(var key in returnData) {
      let manager = returnData[key]["manager_name"];
      managerList.push(manager);
    }
    // console.log(managerList);
  })
}

const employeeSelection = () => {  
  const sql = 'SELECT concat(first_name, " ", last_name) AS employee_name FROM employee ORDER BY last_name'
  return dbSearch(sql)
  .then(returnData => {
    for(var key in returnData) {
      let employee = returnData[key]["employee_name"];
      employeeList.push(employee);
    }
    // console.log(employeeList);
  })
}



// array of main menu questions to prompt user
const mainMenu = [
  {
    name: 'mainMenu',
    message: 'Please select option to proceed:',
    type: 'list',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
  },
]

// array of questions to prompt user about adding new department
const newDept = [
  {
    name: 'newDept',
    message: 'What is the name of the department?',
    type: 'input',
  },
]

const newRole = [
  {
    name: 'newRole',
    message: 'What is the name of the role?',
    type: 'input',
  },
  {
    name: 'newRoleSalary',
    message: 'What is the salary of the role?',
    type: 'number',
  },
  {
    name: 'newFkDept',
    message: 'Which department does the role belong to?',
    type: 'list',
    choices: deptList,
  },
]

const newEmployee = [
  {
    name: 'newFirstName',
    message: 'What is the employee\'s first name?',
    type: 'input',
  },
  {
    name: 'newLastName',
    message: 'What is the employee\'s last name?',
    type: 'input',
  },
  {
    name: 'newFkRole',
    message: 'What is the employee\'s role?',
    type: 'list',
    choices: roleList,
  },
  {
    name: 'newFkManager',
    message: 'Who is the employee\'s manager?',
    type: 'list',
    choices: managerList,
  },
]

const updateEmployeeRole = [
  {
    name: 'updateRoleEmployee',
    message: 'Which employee\'s role do you want to update?',
    type: 'list',
    choices: employeeList,
  },
  {
    name: 'newFkRole',
    message: 'Which role do you want to assign the selected employee?',
    type: 'list',
    choices: roleList,
  },
]

deptSelection();
roleSelection();
managerSelection();
employeeSelection();

//  export the questions
module.exports = {
  mainMenu: mainMenu,
  newDept: newDept,
  newRole: newRole,
  newEmployee: newEmployee,
  updateEmployeeRole: updateEmployeeRole,
  deptSelection: deptSelection,
  roleSelection: roleSelection,
  managerSelection: managerSelection,
  employeeSelection: employeeSelection,
}