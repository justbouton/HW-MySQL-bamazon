// Require MySQL, Inquirer, CLI-table2, showTable to beautify the reponse
const mysql = require('mysql');
const inquirer = require('inquirer');
// const table = require('cli-table2'); Required for showProTable and showCatTable
const showProdTable = require('./showProdTable.js');
const showCatTable = require('./showCatTable.js');

const inquire = inquirer.prompt

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

console.log('\nWelcome to bAmazon! \n')

// UPGRADE user login

function displayAllProdTable() {
	var display = new showProdTable();
	con.query('SELECT * FROM products', function(err, res){
		display.displayInventoryTable(res);
        displayIndvCat() // What items are you interested in purchasing today?
    });
};

function displayCatTable() {
    var display = new showCatTable();
    con.query('SELECT * FROM products GROUP BY category', function(err, res){
        display.displayInventoryTable(res);
    })
};

function displayCatGroup() {
con.query('SELECT category FROM products GROUP BY category', function(err, res){
        if (err) throw err;
displayAllProdTable(choice)
    inquire({     // inquire prompt for item to purchase
            name: "choice",
            type: "rawlist",
            message: "What would you like to browse?",
            choices: function() {
                var choiceArr = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArr.push(res[i].category)
                }
                return choiceArr;
            }
        })
        .then(function(res){
            let choice = res.choice
            displayIndvCat(choice)
        });
    });
};


function displayIndvCat() {
    // con.query('SELECT * FROM products where category = "' + choice + '" ORDER BY name', function(err, res){
    //         if (err) throw err;
    inquire([
        {
            name: "id",
            type: "number",
            message: "Please enter the ID of the item that you wish to purchase?"
        },
        {
            name: "quantity",
            type: "number",
            message: "How many would you like to buy?"
        }
    ])
        .then(function(res){
            // console.log("86: " + res);
            console.log("87: " + res.id);
            console.log("88: " + res.quantity);

// TODO Add logic to compare user choice to items available, confirm or reject purchase

// You would like to purchase id pull from array of products.


            // inquire({
            //     name: "purchase",
            //     type: "rawlist",
            //     message: "Are you sure you want to purchase " + res.choice + "?",
            //     choices: ["Yes", "No"]
            // })
            // .then(function(res){
            //     if (res.purchase === "Yes") {
            //         console.log('Thank you for your purchase!')
            //         start();
            // } else {
                // UPGRADE continue shopping or start()
                start()
            // };
            })
        // })
    // });
};

function endMySql() {
    console.log('\n\nThank you for shopping bAmazon!\n\n')
    con.end(); // Terminates MySQL connection
}


// Start function
function start() {
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
                console.log('Available products')
                displayAllProdTable();
        } else {
            endMySql()
        };
    })
};

start()


// // this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.