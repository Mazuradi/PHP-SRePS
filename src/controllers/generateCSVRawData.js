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

generateRawCSV = () => {
	//Content for writing to a CSV file
	const csvWriter = createCsvWriter({
		path: `./CSVlogs/rawdatalog${datetime}.csv`,
		header: [
			{ id: 'transaction_id', title: 'TRANSACTION ID' },
			{ id: 'sale_id', title: 'SALE ID' },
			{ id: 'quantity', title: 'QUANTITY' },
			{ id: 'date', title: 'DATE' },
			{ id: 'stock_id', title: 'STOCK ID' },
			{ id: 'product_id', title: 'PRODUCT ID' }
		]
	});

	//MySQL search
	const lQuery = `SELECT * FROM transactions`;
	database.query(lQuery, (err, results, fields) => {
		if (err) {
			console.log(err.message);
		}

		var records = [];
		for (var i in results) {
			records.push({
				transaction_id: results[i].transaction_id,
				sale_id: results[i].sale_id,
				quantity: results[i].quantity,
				date: results[i].date,
				stock_id: results[i].stock_id,
				product_id: results[i].product_id
			});
		}

		console.log(records);

		csvWriter
			.writeRecords(records)
			.then(() => {
				//returns promise of csv being complete
				console.log('...CSV Generated!!');
			})
			.catch((e) => console.log(e));
	});
};

module.exports = generateRawCSV;
