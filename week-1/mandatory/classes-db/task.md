# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql

1. `createdb cyf_classed`

2. `create table mentors(
        id SERIAL PRIMARY KEY,
        name varchar(30) NOT NULL,
        years_in_glasgow (smallint) NOT NULL,
        address varchar(120),
        favorite_programming_lang varchar(255)

    );`

3.`insert into mentors(name,years_in_glasgow, address, favorite_programming_lang)
values

    ("Daniel",2,"cfy road, 4", Python),

    ("Fred",2,"cfy road, 4", Python),

    ("Ignacio",2,"Carrer de les parmas, 300", C++),

    ("Mickel",10,"Calle Marollaca, 10", Python),

    ("Anna",5,"MigraCode Plaza, 4", JavaScript),

`

4.`CREATE TABLE students(
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    address varhar(255) NOT NULL,
    is_graduated boolean NOT NULL
)`

5. `INSERT INTO students(name,address, is_graduated)
    VALUES
    ("Bob","bob's street",false),
    ("Bob","bob's street",false),
    ("Bob","bob's street",false),
    ("Bob","bob's street",false),
    ("Bob","bob's street",false),
    ("Bob","bob's street",false),
    ("Bob","bob's street",false),
    ("Bob","bob's street",false),
    ("Bob","bob's street",false),
    ("Bob","bob's street",false)
    `
6. `SELECT * FROM students`
    `SELECT * FROM mentors`

7. `CREATE TABLE classes(
    id SERIAL PRIMARY KEY,
    leading_mentor_id INT REFERENCES mentors(id),
    topic varchar(255) NOT NULL,
    taught_date DATE NOT NULL,
    location varchar(255) NOT NULL
    )`

8. `INSERT INTO classes(leading_mentor,topic, taught_date,location)
    VALUES
    (1,"Html&CSS",12-02-2023,online),

    (3,"JavaScipt",12-02-2023,online),

    (5,"NodeJs",12-02-2023,online)`

9. `CREATE TABLE students_in_class(
    id SERIAL PRIMARY LEY,
    class_id INT REFERENCES classes(id),
    student_id INT REFERENCES students(id)
)`

10.1 `SELECT * FROM mentors where years_glasgow>5;`

10.2 `SELECT * FROM mentors where favorite_programming_lan=Javascript;`

10.3  `SELECT * FROM students WHERE is_graduated=true`

10.4 `SELECT * FROM classes WHERE date<'2022-06-01'`

10.5 `SELECT student_id FROM students_in_class as sc
    JOIN classes as c
    on sc.class_id=c.id
    WHERE c.topic='Javascript';`

```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
5. Insert 10 students in the `students` table.
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

8. Insert a few classes in the `classes` table
9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.
10. Answer the following questions using a `select` SQL statement:

    - Retrieve all the mentors who lived more than 5 years in Glasgow

    - Retrieve all the mentors whose favourite language is Javascript

    - Retrieve all the students who are CYF graduates

    - Retrieve all the classes taught before June this year
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
