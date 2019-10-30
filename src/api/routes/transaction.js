const express = require('express');
const router = express.Router();

//Add functions for adding to DB
const dbInsertFunctions = require('../../../addDBItems');

//Calling GET protocol
router.get('/', (req, res) => {
	res.end(`This is the page to add a Transaction`);
});

//Calling POST protocol
router.post('/addsaletransaction', (req, res) => {
	//May Need input of a transaction type
	dbInsertFunctions.addSaleTransaction(req.body.productName, req.body.exprdate, req.body.quantity);
	res.end(`A Transaction has been made, buying ${req.body.quantity} of ${req.body.productName} with an expiry date of ${req.body.exprdate}.`);
});

router.post('/addrefundtransaction', (req, res) => {
	dbInsertFunctions.addRefundTransaction(req.body.productName, req.body.exprdate, req.body.quantity);
	res.end(`A Transaction has been refunded, returning ${req.body.quantity} of ${req.body.productName} with an expiry date of ${req.body.exprdate}.`);
});

module.exports = router;
