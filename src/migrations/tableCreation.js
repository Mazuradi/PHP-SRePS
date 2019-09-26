var express = require('express');
var app = express();
const dbConnection = require('./DBConnectionDetails');

//Database connection
dbConnection.dbConnect();
var dbconnection = dbConnection.details();

//Main Page
app.get('/', (req, res) => {
	console.log(`You're on the main page!!`);
});

//Drop Desired Table
app.get('/drop/:dropid', (req, res) => {
	let tableToDrop = req.params.dropid;
	let dropTest = `DROP TABLE ${tableToDrop}`;
	dbconnection.query(dropTest, (err, results, fields) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log('Table Successfully Dropped!!');
		}
	});
});

app.get('/create/:createid', (req, res) => {
	//Routing Parameter /
	let tableToCreate = req.params.createid;
	let selectedQuery = '';
	if (tableToCreate == 'products') {
		selectedQuery = `CREATE TABLE IF NOT EXISTS products(product_id INT PRIMARY KEY AUTO_INCREMENT,
                                name VARCHAR(255) NOT NULL,
                                wholesale_price DECIMAL(6,3) NOT NULL,
                                retail_price DECIMAL(6,3) NOT NULL)`;
	} else if (tableToCreate == 'stock') {
		selectedQuery = `CREATE TABLE IF NOT EXISTS stock(stock_id INT PRIMARY KEY AUTO_INCREMENT,
                                product_id INT NOT NULL,
                                quantity INT NOT NULL,
                                exp_date DATE NOT NULL)`;
	} else if (tableToCreate == 'transactions') {
		//TO-DO
		selectedQuery = `CREATE TABLE IF NOT EXISTS transactions(transaction_id INT PRIMARY KEY AUTO_INCREMENT,
                                sale_id INT NOT NULL,
                                quantity INT NOT NULL,
                                date DATE NOT NULL,
                                stock_id INT NOT NULL,
                                product_id INT NOT NULL)`;
	}

	//Running the query
	dbconnection.query(selectedQuery, (err, results, fields) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log(`Table ${tableToCreate} Created!!`);
		}
	});
});

app.listen(1337);
