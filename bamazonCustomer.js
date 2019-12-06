var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Piggy666!",
    database: "bamazon_db"
});

connection.connect(function(error){
    if (error) throw error;
    runMenu();
})

function runMenu() {
    
}