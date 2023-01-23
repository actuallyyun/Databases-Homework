# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
1. SELECT name,address FROM customers WHERE country='United States';
2. SELECT * FROM customers ORDER by name ASC;
3. SELECT * FROM products WHERE unit_price>100;
4. SELECT * FROM products WHERE product_name LIKE '%socks%';
5. SELECT * FROM products ORDER by unit_price DESC LIMIT 5;
6. SELECT product_name, unit_price ,supplier_name FROM products as p
JOIN suppliers as s ON p.supplier_id=s.id;
7. SELECT product_name, supplier_name FROM products as p
JOIN suppliers as s ON p.supplier_id=s.id
WHERE s.country='United Kingdom';
8.SELECT * FROM orders JOIN customers ON orders.customer_id=customers.id WHERE customer_id=1;
9.SELECT * FROM orders JOIN customers ON orders.customer_id=customers.id WHERE customers.name='Hope Crosby';
10. SELECT product_name, unit_price, quantity FROM orders as o
JOIN order_items as oi ON o.id=oi.order_id
JOIN products as p on oi.product_id=p.id
WHERE o.order_reference='ORD006';
11. SELECT name, order_reference, order_date, product_name, supplier_name, quantity
    FROM customers as c
    JOIN orders as o  ON c.id=o.customer_id
    JOIN order_items  as oi ON o.id=oi.order_id
    JOIN products as p ON oi.product_id=p.id
    JOIN suppliers as s ON p.supplier_id=s.id
    ORDER BY name ASC;

12. SELECT name
    FROM customers as c
    JOIN orders as o  ON c.id=o.customer_id
    JOIN order_items  as oi ON o.id=oi.order_id
    JOIN products as p ON oi.product_id=p.id
    JOIN suppliers as s ON p.supplier_id=s.id
    WHERE s.country='China';


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Setup

To prepare your environment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

Open the file `cyf_ecommerce.sql` in VSCode and make sure you understand all the SQL code. Take a piece of paper and draw the database with the different relations between tables. Identify the foreign keys and make sure you understand the full database schema.

## Task

Once you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers names and addresses who lives in United States
2. Retrieve all the customers ordered by ascending name
3. Retrieve all the products which cost more than 100
4. Retrieve all the products whose name contains the word `socks`
5. Retrieve the 5 most expensive products
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
8. Retrieve all orders from customer ID `1`
9. Retrieve all orders from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier from China.
