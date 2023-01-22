INSERT INTO department (department_id, department_name)
VALUES 
    (2, "Engineering"),
    (3, "Finance"),
    (4, "Legal"),
    (1, "Sales");

INSERT INTO roles (fk_department_id, role_title, role_salary)
VALUES
  (1,"Sales Lead",100000),
  (1,"Salesperson",80000),
  (2,"Lead Engineer",150000),
  (2,"Software Engineer",120000),
  (3,"Account Manager",160000),
  (3,"Accountant",125000),
  (4,"Legal Team Lead",250000),
  (4,"Lawyer",190000);

INSERT INTO employee (fk_role_id, first_name, last_name, manager_id)
VALUES
  (5,"Georgi","Facello",null),
  (8,"Bezalel","Simmel",4),
  (1,"Parto","Bamford",null),
  (7,"Chirstian","Koblick",null),
  (1,"Kyoichi","Maliniak",null),
  (4,"Anneke","Preusig",18),
  (1,"Tzvetan","Zielinski",null),
  (6,"Saniya","Kalloufi",1),
  (8,"Sumant","Peac",4),
  (2,"Duangkaew","Piveteau",3),
  (1,"Mary","Sluis",null),
  (6,"Patricio","Bridgland",17),
  (1,"Eberhardt","Terkki",null),
  (2,"Berni","Genin",5),
  (8,"Guoxiang","Nooteboom",4),
  (8,"Kazuhito","Cappelletti",24),
  (5,"Cristinel","Bouloucos",null),
  (3,"Kazuhide","Peha",null),
  (1,"Lillian","Haddadi",null),
  (3,"Mayuko","Warwick",null),
  (4,"Ramzi","Erde",27),
  (1,"Shahaf","Famili",null),
  (4,"Bojan","Montemayor",30),
  (7,"Suzette","Pettey",null),
  (2,"Prasadram","Heyers",3),
  (1,"Yongqiao","Berztiss",null),
  (3,"Divier","Reistad",null),
  (8,"Domenick","Tempesti",39),
  (8,"Otmar","Herbst",43),
  (3,"Elvis","Demeyer",null),
  (8,"Karsten","Joslin",44),
  (4,"Jeong","Reistad",35),
  (6,"Arif","Merlo",17),
  (6,"Bader","Swan",38),
  (3,"Alain","Chappelet",null),
  (4,"Adamantios","Portugali",35),
  (6,"Pradeep","Makrucki",49),
  (5,"Huan","Lortz",null),
  (7,"Alejandro","Brender",null),
  (6,"Weiyi","Meriste",1),
  (1,"Uri","Lenart",null),
  (4,"Magy","Stamatiou",20),
  (7,"Yishay","Tzvieli",null),
  (7,"Mingsen","Casley",null),
  (4,"Moss","Shanbhogue",27),
  (4,"Lucien","Rosenbaum",18),
  (2,"Zvonko","Nyanchama",19),
  (7,"Florian","Syrotiuk",null),
  (5,"Basil","Tramer",null),
  (4,"Yinghua","Dredge",18);