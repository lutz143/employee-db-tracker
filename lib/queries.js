// create class to add in a new department
class NewDept {
  constructor(newDept) {
    this.newDept = newDept;
  }
  getAddDept() {
    let answer = Object.values(this.newDept)
    const newDeptSql = `INSERT INTO department (department_name) VALUES ("${answer}");`
    return newDeptSql
  }
}

// create class to add in a new role
class NewRole {
  constructor(newFkDept, newRole, newRoleSalary) {
    this.newFkDept = newFkDept;
    this.newRole = newRole;
    this.newRoleSalary = newRoleSalary;    
  }
  getAddRole() {
    const newRoleSql = `INSERT INTO roles (fk_department_id, role_title, role_salary) VALUES (${this.newFkDept}, "${this.newRole}", ${this.newRoleSalary});`
    return newRoleSql
  }
}

// create class to add in a new role
class NewEmployee {
  constructor(newFkRole, newFirstName, newLastName, newEmployeeRole, newEmployeeManager) {
    this.newFkRole = newFkRole;
    this.newFirstName = newFirstName;
    this.newLastName = newLastName;
    // this.newEmployeeRole = newEmployeeRole;
    this.newEmployeeManager = newEmployeeManager;
  }
  getAddEmployee() {
    const newEmployeeSql = `INSERT INTO roles (fk_role_id, first_name, last_name, manager_id) VALUES (${this.newFkRole}, "${this.newFirstName}", "${this.newLastName}", ${this.newEmployeeManager});`
    return newEmployeeSql
  }
}


module.exports.NewDept = NewDept;
module.exports.NewRole = NewRole;
module.exports.NewEmployee = NewEmployee;