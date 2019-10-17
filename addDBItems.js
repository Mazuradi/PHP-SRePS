//DatabaseAccess & access to objects (product, stock, trnsaction)
const product = require('./src/controllers/objectProduct');
const stock = require('./src/controllers/objectStock');
//const transaction = require(./controllers/...??);

//Adding a product to the DB from user input
function addProduct(name, wholesale, retail) {
	let newProduct = new product(name, wholesale, retail);
	newProduct.insertProduct();
}

//Adding a stock to the DB from user input
function addStock(product_name, quantity, exprdate) {
	//Get the product_id from the name
	//Function to add in objectProduct to find id of the product
	product.getProductId(product_name, function(result) {
		let newStock = new stock(result, quantity, exprdate);
		newStock.addStock();
	});
}

//Adding a transaction to the DB from user input
function addTransaction(productname, stock, quantity) {
	//Assume sale_id, stock_id & product_id will come from queries
	//productname & stock for getting id
	//Date will come from the current date
}

//Exporting for use in REST
module.exports = { addProduct, addStock, addTransaction };
