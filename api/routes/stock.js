const express = require('express');
const router = express.Router();

//Add functions for adding to DB
const dbInsertFunctions = require('../../addDBItems');

//Calling GET protocol
router.get('/', (req, res) => {
	res.end(`This is the page to add Stock`);
});

//Calling POST protocol
router.post('/', (req, res) => {
	//Need to add body params for user input
	dbInsertFunctions.addStock('isaac', 300, 2019 - 04 - 23);
	res.end(`A product has been added successfully or has failed`);
});

module.exports = router;
