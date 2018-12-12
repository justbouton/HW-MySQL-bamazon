DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;


CREATE TABLE products (
    id INT AUTO_INCREMENT,
    name VARCHAR(99) NOT NULL,
    category VARCHAR(99) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT(10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products(name, category, price, quantity)
VALUE
('Amazon Echo Dot', 'Electronics', 19.99, 89),
('Amazon Show', 'Electronics', 89.99, 92),
('Apple iPad Pro', 'Electronics', 699.99, 120),
('Apple Air', 'Electronics', 499.99, 80),
('Apple iWatch 1st Gen', 'Electronics', 199.99, 20),
('Apple iWatch 2nd Gen', 'Electronics', 299.99, 25),
('Apple iWatch 3rd Gen', 'Electronics', 399.99, 50),
('Apple iWatch 4th Gen GPS ONLY', 'Electronics', 599.99, 100),
('Apple iWatch 4th Gen with Cellular', 'Electronics', 699.99, 200),
('Apple iMac 27" 5k', 'Electronics', 1599.99, 20),
('Apple iMac 21"', 'Electronics', 1199.99, 20),
('Canned Peas, 16oz', 'Groceries', 4.99, 151),
('Canned Carrots, 16oz', 'Groceries', 4.99, 11),
('Canned Tomatoes, 16oz', 'Groceries', 3.99, 120),
('Canned Pearl Onions, 16oz', 'Groceries', 4.99, 112),
('Canned Yams, 16oz', 'Groceries', 2.99, 112),
('Toilet paper, 32 double rolls', 'Bed & Bath', 14.99, 12),
('Instant Pot, 4 cups', 'Appliances', 89.99, 9),
('Instant Pot, 6 cups', 'Appliances', 119.99, 1),
('Instant Pot, 8 cups', 'Appliances', 149.99, 2),
('Towels, White, 6ct', 'Bed & Bath', 29.99, 23),
('Towels, Grey, 6ct', 'Bed & Bath', 29.99, 13);

-- select * from products;

-- select * from products where category = "Bed & Bath";