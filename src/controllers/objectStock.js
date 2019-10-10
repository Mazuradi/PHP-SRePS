const databaseConnection = require('../migrations/DBConnectionDetails');
//Database connection
const database = databaseConnection();

tests();

function tests() {
	//TEST ADD STOCK
	/*let stockObj = new Stock(1, 20, `2019/12/15`);
	stockObj.addStock();*/

	//TEST UPDATE STOCK
	//updateStock(1, 50);

	//TEST GET ALL STOCK RECORD IDS
	/*var allStockRecordIds = getAllStockRecordIds();
	console.log('stock ids: ' + allStockRecordIds);*/

	//TEST GET STOCK DATA FOR PASSED IN STOCK IDS
	allStockRecordIds = [123,124,125,126,127,444,445,446];
	var stockData = getStockData();
	console.log('stock data: ' + JSON.stringify(stockData));
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

function getAllStockRecordIds() {
	var stockIds = [];

	//get all stock record ids
	let query = `SELECT stock_id FROM stock`;
	database.query(query, (err, results, fields) => {
		if (err) {
			console.log(err.message);
		}
		else {
			for (var i=0; i<results.length; i++) {
				stockIds.push(results[i].stock_id);
			}
			//console.log('getAllStockRecordIds() stock ids: ' + stockIds);

			console.log('Successfully retreived all stock ids');

		}
	});

	return stockIds;
}


/**
 * @return Return array of objects with properties: id, productId, quantity, expirationDate
 * 
 */
function getStockData() {
	var stockData = [];

	//get all stock record ids
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

	return stockData;
}