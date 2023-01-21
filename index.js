// load inquirer and mysql
// const fs = require('fs');
const inquirer = require("inquirer");
const mysql = require('mysql2');
const jsonToTable = require('json-to-table');
const classIndex = require("./lib/template");

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

// db.query('SELECT roles.role_id, roles.role_title, department.department_name, roles.role_salary FROM roles LEFT JOIN department ON roles.fk_department_id = department.department_id ORDER BY roles.role_id', function (err, results) {
//   const tables = jsonToTable(results);
//   console.log(tables);
// });

const sql = 'SELECT roles.role_id, roles.role_title, department.department_name, roles.role_salary FROM roles LEFT JOIN department ON roles.fk_department_id = department.department_id ORDER BY roles.role_id'
const roleHeaders = 
`ID     Title
--     -----`
const promptroleGate = () => {
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
  .then(roleRender => {
    console.log(roleRender)
    let rolesTable = []

    for(var key in roleRender) {
      roleId = roleRender[key]["role_id"]
      roleTitle = roleRender[key]["role_title"]
      roleDept = roleRender[key]["department_name"]
      roleSalary = roleRender[key]["role_salary"]

      let role = new classIndex.Role(roleId, roleTitle, roleDept, roleSalary)
      let name = role.getName()
      let title = role.getTitle()
      let dept = role.getDept()
      let salary = role.getSalary()

      rolesTable.push({ID:name, Title:title, Department:dept, Salary:salary})
    }

    console.table(rolesTable)
    process.exit(0);
  })
}


const init = () => {
  promptroleGate()  
}

init();

getEmployeeNames = function(){
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
    )}
)}

// getEmployeeNames()
//   .then(function(results){
//     console.log(results);
// })
//   .catch(function(err){
//     console.log("Promise rejection error: "+err);
// })