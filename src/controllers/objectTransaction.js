const databaseConnection = require('../migrations/DBConnectionDetails');

//Database connection
const database = databaseConnection();

function Transaction(saleID, qty) {
    this.saleID = saleID;
    this.qty = qty;
	this.insertTransaction = function() {
        let insertQuery = `INSERT INTO transactions(sale_id, quantity) 
            VALUES('${this.saleID}', ${this.qty})`;
        database.query(insertQuery, (err, results, fields) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Transaction Added Successfully!!');
            }
        });
	};
}

let transactionTest = new Transaction(1122, 4, 2019);
transactionTest.insertTransaction();