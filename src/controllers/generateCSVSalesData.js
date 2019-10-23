const databaseConnection = require('../migrations/DBConnectionDetails');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//Database Connection
const database = databaseConnection();

//Getting Date & Time | Add to it's own file
var today = new Date();

//Date components
var year = today.getFullYear();
var month = today.getMonth() + 1; //0 - 11 so add 1 for actual months
var day = today.getDate();

//Time components
var hours = today.getHours();
var minutes = today.getMinutes();
var seconds = today.getSeconds();

var time = `${hours}-${minutes}-${seconds}`;
var date = `${year}-${month}-${day}`;
const datetime = `${date}_${time}`;

//Content for writing to a CSV file
const csvWriter = createCsvWriter({
	path: `./CSVlogs/saledatalog${datetime}.csv`,
	//Need to add what goes in The Sales CSV
	header: [ { id: 'transaction_id', title: 'TRANSACTION ID' } ]
});

//Add the results using sales library
//The functions return arrays I believe so add that in
//Then write it to the csv generated
