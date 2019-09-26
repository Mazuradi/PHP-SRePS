var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'developertest',
  password: 'albon',
  database: 'phpsrep'
});

//VARIATION 1 - JSON STYLE.
let product = {
    name: document.getElementById('product_name').value,
    wholesale_px: document.getElementById('product_wholesalepx').value,
    retail_px: document.getElementById('product_retailpx').value,
    insertProduct: function() {
        //Connect to DB and run queries.
        let checkQuery = `SELECT COUNT(*) FROM products WHERE name=${this.name} AND retail_price=${this.retail_px}
                          AND wholesale_price=${this.wholesale_px}`;
        dbConnection.query(checkQuery, (err, results, fields) => {
          if(err){
            console.log(err.message);
          }
          else if(results == 0){
            let insertQuery = `INSERT INTO products(name, wholesale_price, retail_price)
                               VALUES(${this.name}, ${this.wholesale_px}, ${this.retail_px})`;
            dbConnection.query(insertQuery, (err, results, fields) => {
              if(err){
                console.log(err.message);
              }
              else{
                console.log('Product added successfully!!');
              }
            });
          }
          else{
            console.console.log('Product already exists');
          }
        });
    }
};


//VARIATION 2 - FUNCTION STYLE
function Product(name, wholesale, retail){
  this.name = name;
  this.wholesalepx = wholesale;
  this.retailpx = retail;
  this.insertProduct = function() {
    let checkQuery = `SELECT COUNT(*) FROM products WHERE name=${this.name} AND retail_price=${this.retailpx}
                      AND wholesale_price=${this.wholesalepx}`;
    dbConnection.query(checkQuery, (err, results, fields) => {
      if(err){
        console.log(err.message);
      }
      else if(results == 0){
        let insertQuery = `INSERT INTO products(name, wholesale_price, retail_price)
                           VALUES(${this.name}, ${this.wholesalepx}, ${this.retailpx})`;
        dbConnection.query(insertQuery, (err, results, fields) => {
          if(err){
            console.log(err.message);
          }
          else{
            console.console.log('Product Added Successfully!!');
          }
        });
      }
      else{
        console.log('Product already exists');
      }
    });
  };
}

//Object created from blueprint
//Use get id from form, for user input.
let producttest = new Product('panadol', 5.70, 13.50);

dbConnection.end(); //Ends mysql connection.
