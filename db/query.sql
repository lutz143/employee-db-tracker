-- TEST QUERIES TO IMPLEMENT INTO INDEX.JS --

-- provide all roles, depts, and salaries when queried
SELECT roles.role_id, roles.role_title, department.department_name, roles.role_salary
FROM roles
LEFT JOIN department
ON roles.fk_department_id = department.department_id
ORDER BY roles.role_id;