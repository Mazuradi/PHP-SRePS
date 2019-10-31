const express = require('express');
const router = express.Router();

//Files for csv generation
const csvraw = require('../../controllers/generateCSVRawData');
const csvsales = require('../../controllers/generateCSVSalesData');

//Calling GET protocol
router.get('/', (req, res, next) => {
	res.end(`Sales data page??`);
});

//Calling POST protocol
router.get('/generatecsvraw', (req, res, next) => {
	//Generates CSV File of raw data.
	csvraw.generateRawCSV();
	res.end('Successful Generation of Raw CSV');
});

router.get('/generatecsvsales', (req, res, next) => {
	csvsales.generateCSV();
	res.end('Successful Generation of Sales CSV');
});

module.exports = router;
