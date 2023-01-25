// load inquirer and mysql
const inquirer = require("inquirer");
const mysql = require('mysql2');
const jsonToTable = require('json-to-table');
const classIndex = require("./lib/template");
const questions = require("./lib/questions");
const queries = require("./lib/queries");

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
);

// function to call sql query
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

// function to return all the departments in db
const promptDeptGate = () => {
  const sql = 'SELECT department_id, department_name FROM department ORDER BY department_name'
  return dbSearch(sql)
  .then(deptRender => {
    let rolesTable = []

    for(var key in deptRender) {
      let deptId = deptRender[key]["department_id"]
      let deptName = deptRender[key]["department_name"]

      let role = new classIndex.Dept(deptId, deptName)
      deptId = role.getDeptId()
      deptName = role.getDeptName()

      rolesTable.push({"Department ID":deptId, "Department Name":deptName})
    }

    console.table(rolesTable)
    return promptMainMenu()
  })
}

// function to view the total utilized budget of a department—in other words, the combined salaries of all employees in that department 
const promptUtilizedBudget = () => {
  const sql = 'SELECT department.department_name, Sum(roles.role_salary) AS utilized_budget FROM department LEFT JOIN (roles LEFT JOIN (employee RIGHT JOIN employee AS employee_1 ON employee.employee_id = employee_1.manager_id) ON roles.role_id = employee_1.fk_role_id) ON department.department_id = roles.fk_department_id GROUP BY department.department_name'
  return dbSearch(sql)
  .then(answerVal => {
    console.table(answerVal)
    return promptMainMenu()
  })
}

// function to return all the roles in db
const promptRoleGate = () => {
  const sql = 'SELECT roles.role_id, roles.role_title, department.department_name, roles.role_salary FROM roles LEFT JOIN department ON roles.fk_department_id = department.department_id ORDER BY roles.role_id'
  return dbSearch(sql)
  .then(roleRender => {
    let rolesTable = []

    for(var key in roleRender) {
      let roleId = roleRender[key]["role_id"]
      let roleTitle = roleRender[key]["role_title"]
      let roleDept = roleRender[key]["department_name"]
      let roleSalary = roleRender[key]["role_salary"]

      let role = new classIndex.Role(roleId, roleTitle, roleDept, roleSalary)
      let name = role.getName()
      let title = role.getTitle()
      let dept = role.getDept()
      let salary = parseInt(role.getSalary())

      rolesTable.push({ID:name, Title:title, Department:dept, Salary:salary})
    }

    console.table(rolesTable)
    return promptMainMenu()
  })
}

// function to return all employees in db
const promptEmployeeGate = () => {
  const sql = 'SELECT employee_1.employee_id, employee_1.first_name, employee_1.last_name, roles.role_title, department.department_name, roles.role_salary, concat(employee.first_name, " ",employee.last_name) AS manager_name FROM department LEFT JOIN (roles LEFT JOIN (employee RIGHT JOIN employee AS employee_1 ON employee.employee_id = employee_1.manager_id) ON roles.role_id = employee_1.fk_role_id) ON department.department_id = roles.fk_department_id WHERE (((employee_1.employee_id) Is Not Null)) ORDER BY employee_1.employee_id'
  return dbSearch(sql)
  .then(employeeRender => {
    let rolesTable = []

    for(var key in employeeRender) {
      let employeeId = employeeRender[key]["employee_id"]
      let firstName = employeeRender[key]["first_name"]
      let lastName = employeeRender[key]["last_name"]
      let roleTitle = employeeRender[key]["role_title"]
      let deptName = employeeRender[key]["department_name"]
      let roleSalary = parseInt(employeeRender[key]["role_salary"])
      let managerName = employeeRender[key]["manager_name"]

      let employee = new classIndex.Employee(employeeId, firstName, lastName, roleTitle, deptName, roleSalary, managerName)
      let employee_id = employee.getEmployeeId()
      let first_name = employee.getEmployeeFirstName()
      let last_name = employee.getEmployeeLastName()
      let employee_title = employee.getEmployeeTitle()
      let employee_dept = employee.getEmployeeDeptName()
      let employee_salary = employee.getEmployeeSalary()
      let employee_manager = employee.getEmployeeManagerName()

      rolesTable.push({ID:employee_id, "First Name":first_name, "Last Name":last_name, Title:employee_title, Department:employee_dept, Salary:employee_salary, Manager:employee_manager})
    }

    console.table(rolesTable)
    return promptMainMenu()
  })
}

// function to prompt the main menu inquirer questions and call the resulting function given the user's input
const promptMainMenu = () => {
  return inquirer.prompt(questions.mainMenu)
  .then(answerVal => {
    let menuAnswer = new classIndex.Menu(answerVal)
    let response = menuAnswer.getMenuAnswer();
    let answer = Object.values(response)

    if (answer == 'View All Employees') {
      return promptEmployeeGate()
    }

    if (answer == 'View All Roles') {
      return promptRoleGate()
    }

    if (answer == 'View All Departments') {
      return promptDeptGate()
    }

    if (answer == 'Add Department'){
      return addDept()      
    }

    if (answer == 'Add Role'){
      return addRole()
    }

    if (answer == 'Add Employee'){
      return addEmployee()
    }

    if (answer == 'Update Employee Role'){
      return updateEmployeeRole()
    }

    if (answer == 'View Total Utilized Budget by Dept') {
      return promptUtilizedBudget()
    }

    if (answer == 'Quit') {
      return quit()
    }

  })
}

// function to quit the node process if selected by the user
const quit = () => {
  console.log("\nProcess Complete.");
  process.exit(0);
}

// function to add a department via sql from the class NewDept (INSERT INTO)
const addDept = () => {
  return inquirer.prompt(questions.newDept)
  .then(answerVal => {
    let deptAnswer = new queries.NewDept(answerVal)
    let sql = deptAnswer.getAddDept();
    let answer = Object.values(answerVal)
    return dbSearch(sql)
    .then(sqlRun => {
      console.log(`Added ${answer} department.`)
      return questions.deptSelection()
      .then(newDeptList => {
        return promptMainMenu()
      })      
    })    
  })
}

// function to add a role via sql from the class NewRole (INSERT INTO)
const addRole = () => {
  return inquirer.prompt(questions.newRole)
  .then(answerVal => {
    let dept = answerVal.newFkDept
    let fkDeptId = []
    sql = `SELECT department_id FROM department WHERE (department_name="${dept}")`;
    return dbSearch(sql)
    .then(returnData => {
      for(var key in returnData) {
        let deptId = returnData[key]["department_id"];
        fkDeptId.push(deptId);
      }
      let roleAnswer = new queries.NewRole(fkDeptId, answerVal.newRole, answerVal.newRoleSalary)
      let sqlUpdate = roleAnswer.getAddRole();
      return dbSearch(sqlUpdate)
      .then(sqlRun => {
        console.log(`${answerVal.newRole} added to available roles.`)
        return questions.roleSelection()
        .then(newRoleList => {
          return promptMainMenu()
        })        
      })      
    })
  })
}

// function to add an employee via sql from the class NewEmployee (INSERT INTO) but selecting various FKs from subsequent sql select statements
const addEmployee = () => {
  return inquirer.prompt(questions.newEmployee)
  .then(answerVal => {
    let role = answerVal.newFkRole
    let manager = answerVal.newFkManager
    let fkRoleId = []
    let fkManagerId = []
    sql = `SELECT role_id FROM roles WHERE (role_title="${role}")`;
    sqlManager = `SELECT employee_id, concat(employee.first_name," ",employee.last_name) AS manager_name FROM employee WHERE concat(employee.first_name," ",employee.last_name) = "${manager}"`;
    
    return dbSearch(sql)
    .then(returnData => {
      for(var key in returnData) {
        let roleId = returnData[key]["role_id"];
        fkRoleId.push(roleId);
      }

      return dbSearch(sqlManager)
      .then(managerData => {
        for(var key in managerData) {
          let managerId = managerData[key]["employee_id"];
          fkManagerId.push(managerId);
        }

        let employeeAnswer = new queries.NewEmployee(fkRoleId, answerVal.newFirstName, answerVal.newLastName, fkManagerId)
        let sqlUpdate = employeeAnswer.getAddEmployee();
        return dbSearch(sqlUpdate)
        .then(sqlRun => {
          console.log(`${answerVal.newFirstName} ${answerVal.newLastName} added to Employee Database.`)
          return promptMainMenu()
        })
    })      
    })
  })
}

// function to update an employee role given the employee selected from the user and the new role that the selected employee should be assigned using an UPDATE sql statement
const updateEmployeeRole = () => {
  return inquirer.prompt(questions.updateEmployeeRole)
  .then(answerVal => {
    let role = answerVal.newFkRole
    let employee = answerVal.updateRoleEmployee
    sqlUpdate = `UPDATE roles LEFT JOIN employee ON roles.role_id = employee.fk_role_id SET roles.role_title = "${role}" WHERE concat(employee.first_name," ",employee.last_name) = "${employee}"`;
    return dbSearch(sqlUpdate)
    .then(sqlRun => {
      console.log(`Updated role for ${employee} to ${role}.`)
      return promptMainMenu()
    })
  })
}

// function to originally call the main menu prompt when application is initiated
const init = () => {
  // addDept()
  // addRole()
  // addEmployee()
  promptMainMenu()
  // updateEmployeeRole()
  // promptUtilizedBudget()
}

init();