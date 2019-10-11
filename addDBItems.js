//DatabaseAccess & access to objects (product, stock, trnsaction)
const databaseConnection = require('./src/migrations/DBConnectionDetails');
const product = require('./src/controllers/objectProduct');
//const stock = require(./controllers/...??);
//const transaction = require(./controllers/...??);

//DB connection
//const database = databaseConnection();

//Adding a product to the DB from user input
function addProduct(name, wholesale, retail) {
	let newProduct = new product(name, wholesale, retail);
	newProduct.insertProduct();
}

//Adding a stock to the DB from user input
function addStock(productname, quantity, exprdate) {
	//productname used to get the product id
	//quantity & exprdate used in adding the stock item
}

//Adding a transaction to the DB from user input
function addTransaction(productname, stock, quantity) {
	//Assume sale_id, stock_id & product_id will come from queries
	//productname & stock for getting id
	//Date will come from the current date
}

//Exporting for use in REST
module.exports = { addProduct, addStock, addTransaction };

//Data Example - for transaction
/*var today = new Date();
var dd = today.getDate();
var mm = today.getMonth();
var yyyy = today.getFullYear();
if (dd < 10) {
	dd = '0' + dd;
}
if (mm < 10) {
	mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;*/
