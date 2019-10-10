const databaseConnection = require('../migrations/DBConnectionDetails');

//Database connection
const database = databaseConnection();

function Stock(id, quantity) {
    console.log('Stock hello world');
}

let stockTest = new Stock(123, 20);