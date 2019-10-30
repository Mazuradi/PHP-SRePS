const express = require('express');
const router = express.Router();

//Add functions for adding to DB
const DB = require('../../../addDBItems');

//Calling GET protocol
router.get('/', (req, res, next) => {
	res.sendFile('index.html', { root: './' });
});

//Calling POST protocol
router.post('/addproduct', (req, res, next) => {
	if (!req.body) return res.sendStatus(400);
	console.log(req.body);
	DB.addProduct(req.body.productName, req.body.productRetail, req.body.productWholesale);
	res.status(200).end(
		`Name: ${req.body.productName} - Wholesale: ${req.body.wholesale_price} - Retail: ${req.body
			.retail_price} :-: Item Successfully Added!!`
	);
});

module.exports = router;
