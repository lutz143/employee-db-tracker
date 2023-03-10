-- TEST QUERIES TO IMPLEMENT INTO INDEX.JS --

-- provide all dept IDs and dept Names when queried
SELECT department_id, department_name
FROM department
ORDER BY department_name;

-- provide all roles, depts, and salaries when queried
SELECT roles.role_id, roles.role_title, department.department_name, roles.role_salary
FROM roles
LEFT JOIN department
ON roles.fk_department_id = department.department_id
ORDER BY roles.role_id;


-- provide all employee IDs, employee first name, employee last name, job title, department, salary, and manager
SELECT employee_1.employee_id, employee_1.first_name, employee_1.last_name, roles.role_title, department.department_name, roles.role_salary, concat(employee.first_name, " ",employee.last_name) AS manager_name
FROM department LEFT JOIN (roles LEFT JOIN (employee RIGHT JOIN employee AS employee_1 ON employee.employee_id = employee_1.manager_id) ON roles.role_id = employee_1.fk_role_id) ON department.department_id = roles.fk_department_id
WHERE (((employee_1.employee_id) Is Not Null))
ORDER BY employee_1.employee_id;

-- SELECT concat(employee.first_name, " ",employee.last_name)
-- FROM employee
-- WHERE manager_id is not null;
-- LEFT JOIN employee
-- GROUP BY manager_id;
-- LEFT JOIN employee_id ON manager_id;
-- WHERE ;
-- LEFT JOIN employee ON employee_id = manager_id)
-- WHERE employee.manager_id = employee.employee_id)
-- from employee
-- LEFT JOIN employee ON employee_id = manager_id;
-- WHERE employee_id = manager_id;