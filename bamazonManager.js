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

function managerMenu() {
    inquirer
    .prompt ([
        {
            name: "task",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ])
    .then(function(answer){
        switch (answer.task){
            case "View Products for Sale":
                viewProducts();

            case "View Low Inventory":
                viewLowInventory();

            case "Add to Inventory":
                addInventory();

            case "Add New Product":
                createNewProduct();
        }
    })
}