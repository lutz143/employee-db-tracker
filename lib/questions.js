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

const deptSelection = () => {
  const sql = 'SELECT department_name FROM department ORDER BY department_name'
  return dbSearch(sql)
  .then(returnData => {
    for(var key in returnData) {
      let dept = returnData[key]["department_name"];
      deptList.push(dept);
    }
    // console.log(deptList);
  })
}

deptSelection();

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
    name: 'newRoleDept',
    message: 'What is the name of the department?',
    type: 'list',
    choices: deptList,
  },
]

//  export the questions
module.exports.mainMenu = mainMenu;
module.exports.newDept = newDept;
module.exports.newRole = newRole;