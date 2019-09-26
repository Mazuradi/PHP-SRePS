var mysql = require('mysql');

//--------CHANGE CONSTANTS!!!-------//
//Your DB host location
const DB_HOST = 'localhost';
//Your DB username
const DB_USER = 'developertest';
//Your DB password
const DB_PSWD = 'albon';
//Your DB database name
const DB_DATABASE = 'phpsrep';
//---------------------------------//

//Connection Properties + Creating the connection - NO NEED TO TOUCH
var details = () => {
	var dbconnection = mysql.createConnection({
		//properties
		host: DB_HOST,
		user: DB_USER,
		password: DB_PSWD,
		database: DB_DATABASE
	});

	return dbconnection;
};
var dbConnect = () => {
	//Database Connection
	var dbconnection = details();

	dbconnection.connect((error) => {
		if (error) {
			console.log('Error: ' + error.message);
		} else {
			console.log('Successfully Connected!!');
		}
	});

	return dbconnection;
};

module.exports = { dbConnect, details };
