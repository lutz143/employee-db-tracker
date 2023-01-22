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

module.exports.NewDept = NewDept;