const databaseConnection = require('../migrations/DBConnectionDetails');

//Database connection
const database = databaseConnection();

//VARIATION 2 - FUNCTION STYLE
function Product(name, wholesale, retail) {
	this.name = name;
	this.wholesalepx = wholesale;
	this.retailpx = retail;
	this.insertProduct = function() {
		let checkQuery = `SELECT COUNT(*) AS count FROM products WHERE name='${this.name}' 
                      AND retail_price=${this.retailpx} AND wholesale_price=${this.wholesalepx}`;
		database.query(checkQuery, (err, results, fields) => {
			if (err) {
				console.log(err.message);
			} else if (results[0].count == 0) {
				let insertQuery = `INSERT INTO products(name, wholesale_price, retail_price)
                           VALUES('${this.name}', ${this.wholesalepx}, ${this.retailpx})`;
				database.query(insertQuery, (err, results, fields) => {
					if (err) {
						console.log(err.message);
					} else {
						console.log('Product Added Successfully!!');
					}
				});
			} else {
				console.log('Product already exists');
			}
		});
	};
}

//Function to find product ID via a name
getProductId = (product_name) => {
	return new Promise((resolve, reject) => {
		let lQuery = `SELECT product_id FROM products WHERE name = '${product_name}'`;
		database.query(lQuery, (err, results, fields) => {
			if (err) {
				console.log(err.message);
			} else if (results[0] == null) {
				console.log('Product does not exist');
			} else {
				resolve(results[0].product_id);
			}
		});
	});
};

function getProductsData() {
	return new Promise(function(resolve, reject) {
		let query = `SELECT * FROM products`;
		database.query(query, function(err, results) {
			if (err) {
				console.log(err.message);
			} else {
				var productsData = [];
				for (var i = 0; i < results.length; i++) {
					productsData.push({
						id: results[i].product_id,
						name: results[i].name,
						wholesalePrice: results[i].wholesale_price,
						retailPrice: results[i].retail_price
					});
				}

				//console.log('Successfully retreived products data');
				resolve(productsData);
			}
		});
	});
}

/*tests();

async function tests() {
    var productsData = await getProductsData();
    console.log('productsData', productsData);
}*/

module.exports = { Product, getProductId };
