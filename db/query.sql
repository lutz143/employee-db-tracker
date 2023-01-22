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
SELECT employee.employee_id, employee.first_name, employee.last_name, roles.role_title, department.department_id, roles.role_salary, employee.manager_id
FROM 
(department LEFT JOIN roles ON department.department_id = roles.fk_department_id) 
LEFT JOIN employee ON roles.role_id = employee.fk_role_id
-- INNER JOIN employee manager_id ON employee.employee_id
ORDER BY employee.employee_id;