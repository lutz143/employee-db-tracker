// create role class to view all roles 
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

// create role class to view all roles 
class NewRole {
  constructor(newRole, newRoleSalary) {
    this.newRole = newRole;
    this.newRoleSalary = newRoleSalary;
  }
  getAddRole() {
    // JOSH YOU WILL NEED A QUERY TO GRAB THE DEPARTMENT ID FOR THE FK FILD IN ROLES TABLE

    const newRoleSql = `INSERT INTO roles (role_title, role_salary) VALUES ("${this.newRole}, ${this.newRoleSalary}");`
    return newRoleSql
  }
}

module.exports.NewDept = NewDept;
module.exports.NewRole = NewRole;