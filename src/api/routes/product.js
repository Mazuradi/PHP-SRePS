const express = require('express');
const router = express.Router();

//Add functions for adding to DB
const dbInsertFunctions = require('../../../addDBItems');

//Calling GET protocol
router.get('/', (req, res, next) => {
	res.sendFile('index.html', { root: './' });
});

//Calling POST protocol
router.post('/', (req, res, next) => {
	//Function for adding to db
	dbInsertFunctions.addProduct(req.body.productName, req.body.wholesale_price, req.body.retail_price);
	res.end(
		`Name: ${req.body.productName} - Wholesale: ${req.body.wholesale_price} - Retail: ${req.body
			.retail_price} :-: Item Successfully Added!!`
	);
});

module.exports = router;
