INSERT INTO department(name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Accounting");

INSERT INTO role(title, salary, department_id)
VALUES  ("Sales Representative", 90000, 1),
        ("Sales Manager", 150000, 1),
        ("Junior Engineer", 100000, 2),
        ("Lead Engineer", 200000, 2),
        ("Accountant", 125000, 3),
        ("Accounting Manager", 175000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("Joe", "Shmoe", 1, 2),
        ("Moe", "Shmoe", 2, null),
        ("Bo", "Shmoe", 3, 4),
        ("Poe", "Shmoe", 4, null),
        ("Zoe", "Shmoe", 5, 6),
        ("Ro", "Shmoe", 6, null);
