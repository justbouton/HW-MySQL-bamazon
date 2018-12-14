// Displays a user legible table
Table = require('cli-table2');
var displayTable = function() {

    this.table = new Table({
        head: ['ID', 'Product Name', 'Category', 'Price'],
    });

    this.displayInventoryTable = function(results) {
    	this.results = results;
	    for (var i=0; i <this.results.length; i++) {
	        this.table.push(
	            [this.results[i].id, this.results[i].name, this.results[i].category, '$'+ this.results[i].price] );
	    }
    	console.log('\n' + this.table.toString());
	};
}
module.exports = displayTable;