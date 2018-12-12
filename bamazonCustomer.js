// Require MySQL, Inquirer, CLI-table2, showTable to beautify the reponse
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('cli-table2');
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

// UPGRADE user sign in


function displayAllProdTable() {
	var display = new showProdTable();
	con.query('SELECT * FROM products', function(err, res){
		display.displayInventoryTable(res);
	});
};

function displayCatTable() {
    var display = new showCatTable();
    con.query('SELECT category FROM products GROUP BY category', function(err, res){
        display.displayInventoryTable(res);
    })
};

function displayCatGroup() {
con.query('SELECT category FROM products GROUP BY category', function(err, res){
        if (err) throw err;
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


function displayIndvCat(choice) {
    con.query('SELECT * FROM products where category = "' + choice + '" ORDER BY name', function(err, res){
            if (err) throw err;
        inquire({     
            name: "choice",
            type: "rawlist",
            message: "What item would you like to purchase??",
            // TODO add price next to item
            choices: function() {
                var choiceArr = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArr.push(res[i].name)
                };
                return choiceArr;
            }
        })
        .then(function(res){
            inquire({
                name: "purchase",
                type: "rawlist",
                message: "Are you sure you want to purchase " + res.choice + "?",
                choices: ["Yes", "No"]
            })
            .then(function(res){
                if (res.purchase === "Yes") {
                    console.log('Thank you for your purchase!')
                    start();
            } else {
                // UPGRADE continue shopping or start()
                start()
            };
            })
        })
    });
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
            choices: [ "Shop", "Exit" ]
        })
        .then(function(res) {
            // If shop, show table of dept selected
            if (res.selectDept === "Shop") {
                displayCatGroup();
        } else {
            endMySql()
        };
    })
};

start()


// // this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.