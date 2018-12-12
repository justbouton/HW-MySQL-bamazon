// Require MySQL, Inquirer, CLI-table2, showTable to beautify the reponse
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('cli-table2');
const showTable = require('./showTable.js');

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
    if (err) throw err;
})

console.log('\nWelcome to bAmazon! \nHere is a list of items available for purchase. \n')


var displayForUser = function() {
	var display = new displayTable();
	connection.query('SELECT * FROM products', function(err, results){
		display.displayInventoryTable(results);
	});
}

displayForUser();



// query = 'SELECT * FROM products'
// con.query(query, function(err, resp) {
//         for (var i = 0; i < resp.length; i++) {
//             console.log(' ID: ' + resp[i].id + '    Name: ' + resp[i].name + '  || Category: ' + '  || Price: ' + resp[i].price);
//         }
    // Display available items in the table
    // start();
//     con.query.exit;
// });


// Start function
// function start() {
//     inquirer     // inquire prompt for department
//         .prompt({
//             name: "selectDept",
//             type: "rawlist",
//             message: "What department would you like to shop?",
//                choices: function() {
//                          var choiceArr = []
//                          for (var i = 0; i < resp; i++) {
//                          choiceArr.push(resp[i].item_name);
//                          }
//         return choiceArr;
//                       };
//         })
//     .then(function(resp) {
//         // show table of dept selected
//         con.query('SELECT * FROM products WHERE ?' 
//         [
//             {
//                 category: resp.selectDept
//             }
//         ],
//         function(err) {
//             if (err) throw err;
//             start()
//         })
//     });
// };



// this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.