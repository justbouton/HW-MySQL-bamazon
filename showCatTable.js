// Displays a user legible table
Table = require('cli-table2');
var displayTable = function() {

    this.table = new Table({
        head: ['Categories'],
    });

    this.displayInventoryTable = function(results) {
    	this.results = results;
	    for (var i=0; i <this.results.length; i++) {
	        this.table.push(
	            [results[i].category] );
	    }
    	console.log('\n' + this.table.toString());
	};
}
module.exports = displayTable;