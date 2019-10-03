const mysql = require('mysql');
const configDetails = require('./dbconfig');

const connectDatabase = (hostName, databaseUsername, databasePassword, databaseName) => {
	//Database Connection
	const database = mysql.createConnection(configDetails);

	database.connect((error) => {
		if (error) {
			console.log('Error: ' + error.message);
		} else {
			console.log('Successfully Connected!!');
		}
	});

	return database;
};

module.exports =  connectDatabase ;
