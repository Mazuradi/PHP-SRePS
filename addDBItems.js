//DatabaseAccess & access to objects (product, stock, transaction)
const Product = require('./src/controllers/objectProduct');
const Stock = require('./src/controllers/objectStock');
const Transaction = require('./src/controllers/objectTransaction');

//Adding a product to the DB from user input
function addProduct(name, wholesale, retail) {
	//console.log(retail);
	let newProduct = new Product.Product(name, wholesale, retail);
	newProduct.insertProduct();

}

//Adding a stock to the DB from user input
async function addStock(product_name, quantity, exprdate) {
	//Get the product_id from the name
	//Function to add in objectProduct to find id of the product
	console.log(product_name);
	var pr_id = await Product.getProductId(product_name);
	//console.log(pr_id);
	let newStock = new Stock.Stock(pr_id, quantity, exprdate);
	newStock.addStock();
}

//Adding a transaction to the DB from user input
function addSaleTransaction(productname, exprdate, quantity) {
	let newTransaction = new Transaction.Transaction(productname, exprdate, quantity);
	//console.log(productname);
	newTransaction.saleTransaction();
}

//Refunding a transaction to the DB from user input
function addRefundTransaction(productname, exprdate, quantity) {
	let newTransaction = new Transaction.Transaction(productname, exprdate, quantity);
	newTransaction.refundTransaction();
}

//Exporting for use in REST
module.exports = { addProduct, addStock, addSaleTransaction, addRefundTransaction };
