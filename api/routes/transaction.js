const express = require('express');
const router = express.Router();

//Add functions for adding to DB
const dbInsertFunctions = require('../../addDBItems');

//Calling GET protocol
router.get('/', (req, res) => {
	res.end(`This is the page to add a Transaction`);
});

//Calling POST protocol
router.post('/', (req, res) => {
	res.end(`Add transaction has been added succesfully or has failed`);
});

module.exports = router;
