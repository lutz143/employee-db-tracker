// require the template js to grab the beginning and ending html variables
const indexJs = require("../index");

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

module.exports.Role = Role;