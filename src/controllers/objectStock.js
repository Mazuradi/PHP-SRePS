const databaseConnection = require('../migrations/DBConnectionDetails');
//Database connection
const database = databaseConnection();

var util = require('util');

//check if stock already exists
let checkStockExistsQuery = `SELECT COUNT(*) AS count FROM stock WHERE stock_id = '${this.stockid}'`;

//check if product exists
let checkProductExistsQuery = `SELECT COUNT(*) AS count FROM products WHERE product_id = '${this.productid}'`;
	
//add into stock table
let addStockQuery = `INSERT INTO stock(stock_id, product_id, quantity, exp_date)
				VALUES('${this.stockid}', '${this.productid}', '${this.quantity}', '${this.expirationdate}')`;

//get all stock record ids
let getAllStockRecordIdsQuery = `SELECT stock_id FROM stock`;

let stockTest = new Stock(444, 1, 20, `2019/12/15`);
stockTest.addStock();

//updateStock(123, 30);

var allStockRecordIds = getAllStockRecordIds();
console.log(allStockRecordIds);
//console.log(util.inspect(allStockRecordIds));

function Stock(stock_id, product_id, quantity, expiration_date) {
    this.stockid = stock_id;
    this.productid = product_id;
    this.quantity = quantity;
    this.expirationdate = expiration_date;			
	
	this.addStock = function() {
		database.query(checkStockExistsQuery, (err, results, fields) => {
			if (err) {
				console.log(err.message);
			}
			else if (results[0].count == 0) {
				database.query(checkProductExistsQuery, (err, results, fields) => {
					if (err) {
						console.log(err.message);
					}
					else if (results[0].count == 0) {
						console.log('Product does not exist!');
					}
					else {
						database.query(addStockQuery, (err, results, fields) => {
							if (err) {
								console.log(err.message);
							} else {
								console.log('Stock added successfully');
							}
						});
					}
				});
			}
			else {
				console.log('Stock already exists!');
			}
		});
	}

	/*this.getStockValues = function() {
		database.query(checkStockExistsQuery, (err, results, fields) => {
			if (err) {
				console.log(err.message);
			}
			else if (results[0].count == 0) {
				console.log('Stock does not exist!');
			}
			else {
				database.query(updatStockQuantity, (err, results, fields) => {
					if (err) {
						console.log(err.message);
					}
					else {
						console.log('Stock quantity successfully updated');
					}
				});
			}
		});
	}*/
}

function updateStock(stockId, newQuantity) {
	console.log('stockId: ' + stockId);
	let checkStockExistsQuery = `SELECT COUNT(*) AS count FROM stock WHERE stock_id = '${stockId}'`;
	database.query(checkStockExistsQuery, (err, results, fields) => {
		if (err) {
			console.log(err.message);
		}
		else if (results[0].count == 0) {
			console.log('Stock does not exist!');
		}
		else {
			let query = `UPDATE stock SET quantity = '${newQuantity}' WHERE stock_id = '${stockId}'`;
			database.query(query, (err, results, fields) => {
				if (err) {
					console.log(err.message);
				}
				else {
					console.log('Stock quantity successfully updated');
				}
			});
		}
	});
}

function getAllStockRecordIds() {
	var stockIds = null;

	database.query(getAllStockRecordIdsQuery, (err, results, fields) => {
		if (err) {
			console.log(err.message);
		}
		else {
			stockIds = results;
			//console.log('results: ' + results);
			console.log(util.inspect(results));
			console.log('Successfully retreived all stock ids');
		}
	});

	return stockIds;
}