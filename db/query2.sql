-- test query for looking up a role ID
-- SELECT role_id FROM roles WHERE (role_title="Lawyer");
-- SELECT * FROM roles;

-- test query to find leads and managers
-- SELECT roles.role_title, employee.first_name, employee.last_name, concat(employee.first_name," ",employee.last_name) AS manager_name
-- FROM roles LEFT JOIN employee ON roles.role_id = employee.fk_role_id
-- WHERE (((roles.role_title) LIKE '%Lead%')) OR (((roles.role_title) LIKE '%Manager%'))
-- ORDER BY manager_name;


-- test query to find filter on manager for their ID
-- SELECT employee_id, concat(employee.first_name," ",employee.last_name) AS manager_name
-- FROM employee
-- WHERE concat(employee.first_name," ",employee.last_name) = "Mary Sluis";

-- test query to update an employee to a new role
-- UPDATE roles LEFT JOIN employee ON roles.role_id = employee.fk_role_id SET roles.role_title = "Account Manager" WHERE concat(employee.first_name," ",employee.last_name) = "Ramzi Erde";

-- test query to pull employee name into a list
SELECT concat(first_name, " ", last_name) AS employee_name FROM employee ORDER BY last_name;