const databaseConnection = require('../migrations/DBConnectionDetails');
//Database connection
const database = databaseConnection();

var util = require('util');

tests();

function tests() {
	//TEST ADD STOCK
	let stockObj = new Stock(1, 20, `2019/12/16`);
	stockObj.addStock();

	//TEST UPDATE STOCK
	//updateStock(1, 50);

	//TEST GET STOCK DATA
	/*var stockData = getStockData();
	console.log('stock data: ' + JSON.stringify(stockData));*/
}

function Stock(product_id, quantity, expiration_date) {
    this.productid = product_id;
    this.quantity = quantity;
	this.expirationdate = expiration_date;

	this.addStock = function() {
		//check if product exists
		let checkProductExistsQuery = `SELECT COUNT(*) AS count FROM products WHERE product_id = '${this.productid}'`;
		database.query(checkProductExistsQuery, (err, results, fields) => {
			if (err) {
				console.log(err.message);
			}
			else if (results[0].count == 0) {
				console.log('Product does not exist!');
			}
			else {
				let checkStockExistsQuery = `SELECT COUNT(*) AS count FROM stock 
										 	 WHERE product_id = '${this.productid}'
											 AND exp_date = '${this.expirationdate}'`;
				database.query(checkStockExistsQuery, (err, results, fields) => {
					if (err) {
						console.log(err.message);
					}
					else if (results[0].count == 0) {
						//add into stock table
						let addStockQuery = `INSERT INTO stock(product_id, quantity, exp_date)
						VALUES('${this.productid}', '${this.quantity}', '${this.expirationdate}')`;
						database.query(addStockQuery, (err, results, fields) => {
							if (err) {
								console.log(err.message);
							} else {
								console.log('Stock added successfully');
							}
						});
					}
					else {						
						console.log('Stock with the same product and expiration date already exsist!');
					}
				});
			}
		});
	}
}

function updateStock(stockId, newQuantity) {
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

/**
 * @return Array of objects with properties: id, productId, quantity, expirationDate
 * 
 */
function getStockData() {
	var stockData = [];

	//get all stock record data
	let query = `SELECT * FROM stock`;
	database.query(query, (err, results, fields) => {
		if (err) {
			console.log(err.message);
		}
		else {
			for (var i=0; i<results.length; i++) {
				stockData.push({ id:			 results[i].stock_id,
								 productId: 	 results[i].product_id,
								 quantity: 		 results[i].quantity,
								 expirationDate: results[i].exp_date});
			}
			console.log('getStockData() stock data: ' + JSON.stringify(stockData));

			console.log('Successfully retreived stock data');

		}
	});
	console.log('getStockData() stock data 2: ' + JSON.stringify(stockData));

	return stockData;
}