const express = require('express');
const router = express.Router();

//Add functions for adding to DB
const dbInsertFunctions = require('../../../addDBItems');

//Calling GET protocol
router.get('/', (req, res) => {
	res.end(`This is the page to add Stock`);
});

//Calling POST protocol
router.post('/', (req, res) => {
	res.end(`A product has been added successfully or has failed`);
});

module.exports = router;
