SELECT employee_1.employee_id, employee_1.first_name, employee_1.last_name, roles.role_title, department.department_name, roles.role_salary, concat(employee.first_name, " ",employee.last_name) AS manager_name
FROM department LEFT JOIN (roles LEFT JOIN (employee RIGHT JOIN employee AS employee_1 ON employee.employee_id = employee_1.manager_id) ON roles.role_id = employee_1.fk_role_id) ON department.department_id = roles.fk_department_id
WHERE (((employee_1.employee_id) Is Not Null))
ORDER BY employee_1.employee_id;
