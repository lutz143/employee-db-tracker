DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fk_department_id INT,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL NOT NULL,
  FOREIGN KEY (fk_department_id)
  REFERENCES department(department_id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fk_role_id INT,  
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT REFERENCES employee(employee_id),  
    FOREIGN KEY (fk_role_id) REFERENCES roles(role_id)
);
