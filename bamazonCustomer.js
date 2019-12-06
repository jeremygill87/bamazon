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

var productArray = [];

function runMenu() {
    connection.query("SELECT * FROM products", function(error, results){
        if (error) throw error;
        for (var i = 0; i < results.length; i++){
            productArray.push(results[i]);
        }
        return productArray;
    })

}