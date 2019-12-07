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
    runInventory();
})

var productArray = [];
var totalCost = 0;
function runInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function(error, results){
        if (error) throw error;
        for (var i = 0; i < results.length; i++){
            productArray.push(results[i]);
        };
        generateTable();
    });
}

function generateTable() {
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
        selectionPrompt();
    }

function selectionPrompt(){
    inquirer
    .prompt([
        {
        name: "purchase",
        type: "input",
        message: "Which product would you like to purchase?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
        }
    ])
    .then(function(answer){
        var selection = productArray[answer.purchase-1];
        if (answer.quantity <=selection.stock_quantity){
            selection.stock_quantity -= answer.quantity;
            console.log("Purchase successful!");
            totalCost += selection.stock_quantity * selection.price;
            console.log("Total Cost: $" + totalCost);
            continuePrompt();
        }
        else if (answer.quantity > selection.stock_quantity){
            console.log("Insufficient quantity in stock");
            generateTable();
        }

    })
}

function continuePrompt() {
    inquirer.prompt([
        {
        name: "continue",
        type: "confirm",
        default: false,
        message: "Would you like to continue?"
        }
    ])
    .then(function(answer){
        if (answer.continue === true){
            generateTable();
        }
        if (answer.continue === false){
            console.log("Your total is: $" + totalCost);
        }
    })
}