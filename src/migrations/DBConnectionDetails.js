const mysql = require('mysql');
const dbConfig = require('./dbconfig');

//Connection Properties + Creating the connection - NO NEED TO TOUCH
const createDatabase = () => {
	return mysql.createConnection(dbConfig);
};

const connectDatabase = (hostName, databaseUsername, databasePassword, databaseName) => {
	//Database Connection
	const database = createDatabase(
		hostName,
		databaseUsername,
		databasePassword,
		databaseName);

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
