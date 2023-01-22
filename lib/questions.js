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


//  export the questions
module.exports.mainMenu = mainMenu;
module.exports.newDept = newDept;