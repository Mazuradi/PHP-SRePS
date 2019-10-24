//DatabaseAccess & access to objects (product, stock, trnsaction)
const product = require('./src/controllers/objectProduct');
const stock = require('./src/controllers/objectStock');
const transaction = require('./src/controllers/objectTransaction');

//Adding a product to the DB from user input
function addProduct(name, wholesale, retail) {
	let newProduct = new product(name, wholesale, retail);
	newProduct.insertProduct();
}

//Adding a stock to the DB from user input
async function addStock(product_name, quantity, exprdate) {
	//Get the product_id from the name
	//Function to add in objectProduct to find id of the product
	var pr_id = await product.getProductId(product_name);
	console.log(pr_id);
	let newStock = new stock(pr_id, quantity, exprdate);
	newStock.addStock();
}

//Adding a transaction to the DB from user input
function addSaleTransaction(productname, exprdate, quantity) {
	let newTransaction = new transaction(productname, exprdate, quantity);
	newTransaction.saleTransaction();
}

//Refunding a transaction to the DB from user input
function addRefundTransaction(transactionnum) {
	refundingTransaction(transactionnum);
}

//Exporting for use in REST
module.exports = { addProduct, addStock, addSaleTransaction, addRefundTransaction };
