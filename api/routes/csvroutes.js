const express = require('express');
const router = express.Router();

//Files for csv generation
const csvraw = require('../../src/controllers/generateCSVRawData');
const csvsales = require('../../src/controllers/generateCSVSalesData');

//Calling GET protocol
router.get('/', (req, res, next) => {
	res.end(`Sales data page??`);
});

//Calling POST protocol
router.post('/generatecsvraw', (req, res, next) => {
	//Generates CSV File of raw data.
	csvraw.generateRawCSV();
});
