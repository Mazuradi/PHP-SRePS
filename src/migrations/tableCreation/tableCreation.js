const databaseConnection = require('../DBConnectionDetails');
const tableQuery = require('./TableCreationQueries');

const createProductTable = (database) => {
	database.query(tableQuery.products, (err, result) => {
		if (err) throw err;
		console.log("Product Table Created")
	})
};

const createStockTable = (database) => {
	database.query(tableQuery.stock, (err, result) => {
		if (err) throw err;
		console.log("Stock Table Created")
	})
};

const createTransactionsTable = (database) => {
	database.query(tableQuery.transactions, (err, result) => {
		if (err) throw err;
		console.log("Transactions Table Created")
	})
};

const createTables = () => {
	const database = databaseConnection();

	createProductTable(database);
	createStockTable(database);
	createTransactionsTable(database);
};

module.exports={createTables,createProductTable,createStockTable,createTransactionsTable};