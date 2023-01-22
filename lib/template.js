// require the template js to grab the beginning and ending html variables
const indexJs = require("../index");

// create class to mainMenu answer
class Menu {
  constructor(answer) {
    this.answer = answer;
  }
  getMenuAnswer() {
    const answer = this.answer
    return answer
  }
}

// create role class to view all roles 
class Dept {
  constructor(deptId, deptName) {
    this.deptId = deptId;
    this.deptName = deptName;
  }
  getDeptId() {
    const deptId = this.deptId
    return deptId
  }
  getDeptName() {
    const deptName = this.deptName
    return deptName
  }
}

// create role class to view all roles 
class Role {
  constructor(roleId, roleTitle, roleDept, roleSalary) {
    this.roleId = roleId;
    this.roleTitle = roleTitle;
    this.roleDept = roleDept;
    this.roleSalary = roleSalary;
  }
  getName() {
    const roleId = this.roleId
    return roleId
  }
  getTitle() {
    const roleTitle = this.roleTitle
    return roleTitle
  }
  getDept(){
    const roleTitle = this.roleDept
    return roleTitle
  }
  getSalary(){
    const roleSalary = this.roleSalary
    return roleSalary
  }
}

class Employee {
  constructor(employeeId, firstName, lastName, roleTitle, deptName, roleSalary, managerName) {
    this.employeeId = employeeId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleTitle = roleTitle;
    this.deptName = deptName;
    this.roleSalary = roleSalary;
    this.managerName = managerName;
  }
  getEmployeeId() {
    const employeeId = this.employeeId
    return employeeId
  }
  getEmployeeFirstName() {
    const firstName = this.firstName
    return firstName
  }
  getEmployeeLastName() {
    const lastName = this.lastName
    return lastName
  }
  getEmployeeTitle() {
    const roleTitle = this.roleTitle
    return roleTitle
  }
  getEmployeeDeptName() {
    const deptName = this.deptName
    return deptName
  }
  getEmployeeSalary() {
    const roleSalary = this.roleSalary
    return roleSalary
  }
  getEmployeeManagerName() {
    const managerName = this.managerName
    return managerName
  }
}

module.exports.Menu = Menu;
module.exports.Role = Role;
module.exports.Dept = Dept;
module.exports.Employee = Employee;