const express = require('express');
const router = express.Router();

//Add functions for adding to DB
const dbInsertFunctions = require('../../../addDBItems');

//Calling GET protocol
router.get('/', (req, res) => {
	res.end(`This is the page to add Stock`);
});

//Calling POST protocol
router.post('/addstock', (req, res) => {
	//Need to add body params for user input
	console.log(req.body);
	dbInsertFunctions.addStock(req.body.productname, req.body.quantity, req.body.exprdate);
	res.end(`Name: ${req.body.productName}, Quantity: ${req.body.quantity}, Expr Date: ${req.body.exprdate}`);
});

module.exports = router;
