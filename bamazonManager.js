var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("easy-table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Piggy666!",
    database: "bamazon_db"
});

connection.connect(function(error){
    if (error) throw error;
    managerMenu();
})
var productArray = [];

function managerMenu() {
    inquirer
    .prompt ([
        {
            name: "task",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ])
    .then(function(answer){
        if (answer.task === "View Products for Sale"){
            viewProducts();
        }
        else if (answer.task === "View Low Inventory"){
            viewLowInventory();
        }
        else if (answer.task === "Add to Inventor"){
            addInventory();
        }
        else if (answer.task === "Add New Product"){
            createNewProduct();
        }
    })
}

function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(error, results){
        if (error) throw error;
        for (var i = 0; i < results.length; i++){
            productArray.push(results[i]);
        }
        var t = new table;
        productArray.forEach(function(product){
        t.cell("Product ID", product.item_id)
        t.cell("Product Name", product.product_name)
        t.cell("Department Name", product.department_name)
        t.cell("Price", product.price)
        t.cell("In Stock", product.stock_quantity)
        t.newRow()
    })
    console.log(t.toString());
    managerMenu();
    });
}

function viewLowInventory() {
    var lowProductArray = [];
    var query = "SELECT * FROM products WHERE stock_quantity <= 5";
    connection.query(query, function(error, results){
        if (error) throw error;
        for (var i = 0; i < results.length; i++){
            lowProductArray.push(results[i]);
        };
        var t = new table;
        lowProductArray.forEach(function(product) {
            t.cell("Product ID", product.item_id)
            t.cell("Product Name", product.product_name)
            t.cell("Department Name", product.department_name)
            t.cell("Price", product.price)
            t.cell("In Stock", product.stock_quantity)
            t.newRow()
        })
        console.log(t.toString());
        managerMenu();
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, results){
        if (err) throw err;
         inquirer
        .prompt ([
        {
            name: "product",
            type: "rawlist",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++){
                    choiceArray.push(results[i]);
                }
                var t = new table;
                choiceArray.forEach(function(product){
                    t.cell("Product ID", product.item_id)
                    t.cell("Product Name", product.product_name)
                    t.cell("Department Name", product.department_name)
                    t.cell("Price", product.price)
                    t.cell("In Stock", product.stock_quantity)
                    t.newRow()
                })
                console.log(t.toString);
            },
            message: "Which product would you like to restock?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much product would you like to restock?"
        }
    ])
    .then(function(answer){
        var selection = productArray[answer.product-1];
        var updateStock = "UPDATE products SET stock_quantity = " + (selection.stock_quantity + answer.quantity) + " WHERE item_id = " + selection.item_id;
        connection.query(updateStock, function(err, res){
            if (err) throw err;
        })
        addInventory();
    })
   
    })
    
}

function createNewProduct() {
    inquirer
    .prompt ([
        {
            name: "newProductName",
            type: "input",
            message: "What is the new product's name?"
        }, 
        {
            name: "newProductDepartmentName",
            type: "input",
            message: "Add product to which department?"
        },
        {
            name: "newProductPrice",
            type: "input",
            message: "How much is your product, per unit?"
        },
        {
            name: "newProductQuantity",
            type: "input",
            message: "How many would you like to add?"
        }
    ])
    .then(function(answer) {
        productArray.push(answer);
        console.log(productArray);
        var update = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" +
                                answer.newProductName + "','" + answer.newProductDepartmentName + "','" + 
                                answer.newProductPrice + "','" + answer.newProductQuantity + "')";
        connection.query(update, function(err, results){
            if (err) throw err;
            console.log("Product added!");
            managerMenu();
        })
        
    })
    
}