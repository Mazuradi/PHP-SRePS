var express = require('express');
var app = express();
const databaseConnection = require('../migrations/DBConnectionDetails');
const createTable = require('../migrations/tableCreation/tableCreation')

const database = databaseConnection();

//Main Page
app.get('/', (req, res) => {
  console.log(`You're on the main page!!`);
});

//Drop Desired Table
app.get('/drop/:dropid', (req, res) => {
  let tableToDrop = req.params.dropid;
  let dropTest = `DROP TABLE ${tableToDrop}`;
  database.query(dropTest, (err, results, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Table Successfully Dropped!!');
    }
  });
});

app.get('/create-table/:createid', (req, res) => {
  //Routing Parameter /
  let tableToCreate = req.params.createid;
  if (tableToCreate == 'products') {
    createTable.createProductTable();
  } else if (tableToCreate == 'stock') {
    createTable.createStockTable();
  } else if (tableToCreate == 'transactions') {
    createTable.createTransactionsTable();
  }else{
    console.log('Cannot make that table')
  }
});

app.listen(1337);
