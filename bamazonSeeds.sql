DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT default 0;
    stock_quantity INT default 0;
    PRIMARY KEY (item_id);
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ("Fossilized Kidney Stones", "Oddities", 16.00, 50),
    ("The Communist Mani-Pedi", "Books", 24.00, 25),
    ("Ben Ng's Knowledge", "Impossibilities", 5000.00, 10),
    ("Your Father's Approval", "Impossibilities", 15.95, 30),
    ("Super Mario Batali", "Video Games", 39.95, 50),
    ("Miniature Equine Accoutrements", "Fashion", 29.99, 100),
    ("Happiness That Isn't Fleeting", "Impossibilities", 50.00, 250),
    ("Factory Defect Prosthetic Leg", "Fashion", 250.00, 25),
    ("The Lebron James Bible", "Books", 19.99, 200),
    ("Helen Hunt", "Oddities", 799.95, 1),
    ("Bob's Aspergers", "Books", 24.95, 20),
    ("Kingdom Farts", "Video Games", 19.99, 50);
