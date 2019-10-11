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

//Object created from blueprint
//Use get id from form, for user input.
//let producttest = new Product('baclofen', 6.7, 10.5);
//producttest.insertProduct();

//dbConnection.end(); //Ends mysql connection.
module.exports = Product;
