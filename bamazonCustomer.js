// Require MySQL, Inquirer, CLI-table2, showTable to beautify the reponse
const mysql = require('mysql');
const inquirer = require('inquirer');
// const table = require('cli-table2'); Required for showProTable and showCatTable
const showProdTable = require('./showProdTable.js');
// const showCatTable = require('./showCatTable.js');

const inquire = inquirer.prompt;

// Create mysql connection
const con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "bamazonDB"
});

// Connect to mysql
con.connect(function(err){
    if (err) {
    console.log('Cannot connect to bamazonDB. ERROR: ' + err)
    };
});

console.log('\nWelcome to bAmazon!');

// UPGRADE user login


function endMySql() {
    console.log('\n\nThank you for shopping bAmazon!\n\n')
    con.end(); // Terminates MySQL connection
}

function displayAllProdTable() {
	var display = new showProdTable();
	con.query('SELECT * FROM products', function(err, res){
		display.displayInventoryTable(res);
        purchaseInventory(); // What items are you interested in purchasing today?
    });
};

function purchaseInventory() {
    inquire([
        {
            name: "id",
            type: "number",
            message: "Please enter the ID of the item that you wish to purchase?",
            validate: function(value) { // UPGRADE con.query id.length replace 12 below.
                if ((value <= 0) || (value > 12)) {
                    return 'Enter a number between 1-12'
                } else {
                    var valid = !isNaN(parseFloat(value));
                    return valid || "Please enter a number";
                }
            },
        },
        {
            name: "quantity",
            type: "number",
            message: "How many would you like to buy?",
            validate: function(value) {
                if (value <= 0) {
                    return 'Enter a number greater than 0'
                } else {
                    var valid = !isNaN(parseFloat(value));
                    return valid || "Please enter a number";
                }
            },
            // filter: Number
        },
        ])
        .then(function(res){
            var userChoice = res.id;
            var userQuantity = res.quantity;
            // console.log("\nuserChoice: " + userChoice);
            console.log("\nQuantity selected: " + userQuantity);

                // Get mysql availablity of the item number selected
                con.query('SELECT * FROM products where id = ' + userChoice, function(err, res){
                const itemName = res[0].name;
                const itemPrice = res[0].price;
                const itemAvailible = res[0].quantity;
                console.log("\nCurrent inventory: " + itemAvailible + "\n");
                const totalCost = Math.round((itemPrice * userQuantity) * 100) / 100;

                // If quantity is 0 
                if ((userQuantity >= itemAvailible) || (itemAvailible === 0)) {
                    console.log('\nInsufficient quantity on hand\n');
                    purchaseInventory();
                } else {


// Confirm purchase
                    inquire([
                        {
                            name: "confirm",
                            type: "rawlist",
                            message: "Are you sure you want to purchase " + itemName + " totaling $" + totalCost + "?",
                            choices: [ "YES", "NO" ],
                        },
                    ])
                    .then(function(res) {
                        var yesNo = res.confirm;
                            // If shop, show table of dept selected
                            if (yesNo === "YES") {
                                // Compare user userQuantity to itemAvailable, confirm or reject purchase pending item availability.
                                    // UPDATE MySQL
                                    var updateItem = itemAvailible - userQuantity;
                                    console.log('\nUpdate DB quantity to: ' + updateItem); 
                                    itemPurchased(itemName, itemPrice, userChoice, totalCost, updateItem); 
                        } else {
                            purchaseInventory()
                        };
            
                    })  
                }
        })
    });
};

// ItemPurchased, delete from MySQL
function itemPurchased(itemName, itemPrice, userChoice, totalCost, updateItem) {
    // console.log("116 updateItem: " + updateItem);
    // console.log("117 userChoice: " + userChoice);
    // console.log("118 itemName: " + itemName);
    // console.log("119 itemPrice: " + itemPrice);
    // totalCost = Math.floor(itemPrice * userQuantity);
    con.query(
        'UPDATE products SET ? WHERE ?',
        [
            {
                quantity: updateItem
            },
            {
                id: userChoice
            }
        ]) 
        console.log('\nOrder placed!\n');
        console.log('\nThank you for ordering "' + itemName + '"\n')
        console.log(' -- Your total is: $' + totalCost + ' --\n')
        start();
};


// Start function
function start() {
    console.log("")
    inquire({     
            name: "selectDept",
            type: "rawlist",
            message: "Would you like to do shop or exit?",
            choices: [ "SHOP", "EXIT" ]
        })
        .then(function(res) {
            var answer = res.selectDept.toUpperCase().trim()
            // If shop, show table of dept selected
            if (answer === "SHOP") {
                // displayCatGroup();
                console.log('\nAvailable products')
                displayAllProdTable();
        } else {
            endMySql()
        };
    })
};

start()