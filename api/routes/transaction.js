const express = require('express');
const router = express.Router();

//Add functions for adding to DB
const dbInsertFunctions = require('../../addDBItems');

//Calling GET protocol
router.get('/', (req, res) => {
	res.end(`This is the page to add a Transaction`);
});

//Calling POST protocol
router.post('/addtransaction', (req, res) => {
	//May Need input of a transaction type
	dbInsertFunctions.addTransaction(req.body.productName, req.body.quantity);
	res.end(`A Transaction has been made, buying ${req.body.quantity} of ${req.body.productName}.`);
});

module.exports = router;
