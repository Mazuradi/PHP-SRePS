const databaseConnection = require('../migrations/DBConnectionDetails');

//Database connection
const database = databaseConnection();

function Transaction(sale_id, quantity, date, stock_id, product_id)
{
    this.saleid = sale_id; //not too sure what this is used for again
    this.quantitynum = quantity;
    this.datenum = date;
    this.stockid = stock_id;
    this.productid = product_id;
    
    //check if product exists for transaction
    let checkProductQuery = `SELECT COUNT(*) AS count FROM products WHERE product_id = '${this.productid}'`;

    //check if there is stock of said product
    let checkStockQuery = `SELECT COUNT(*) AS count FROM stock WHERE stock_id = '${this.stockid}' AND product_id = '${this.productid}'`; 
    
    //check if there is enough stock for a sale
    let checkEnoughStockQuery = `SELECT COUNT(*) AS count FROM stock WHERE stock_id = '${this.stockid}' AND product_id = '${this.productid}' AND quantity >= '${this.quantitynum}'`;
    
    //reduce stock due to sale
    let saleStockQuery = `UPDATE stock SET quantity = quantity - '${this.quantitynum}'
                        WHERE stock_id = '${this.stockid}' AND product_id = '${this.productid}' AND quantity >= '${this.quantitynum}'`; 
    
    // increase stock due to refund
    let refundStockQuery = `UPDATE stock SET quantity = quantity + '${this.quantitynum}'
                        WHERE stock_id = '${this.stockid}' AND product_id = '${this.productid}'`;
    
    //add into transaction table
    let updateTransactions = `INSERT INTO transactions(sale_id, quantity, date, stock_id, product_id)
                    VALUES('${this.saleid}', '${this.quantitynum}', '${this.datenum}', '${this.stockid}', '${this.productid}')`;

    this.saleTransaction = function()
    {   
        database.query(checkProductQuery, (err, results, fields) =>
        {
            if (err)
            {console.log(err.message);}

            else if (results[0].count == 0)
            {console.log('Product does not exist');}

            else
            {
                database.query(checkEnoughStockQuery, (err, results, fields) => 
                {
                    if(err)
                    {console.log(err.message);}

                    else if (results[0].count == 0)
                    {console.log('Stock does not exist/Not Enough Stock');}

                    else 
                    {
                        database.query(saleStockQuery, (err, results, fields) =>
                        {
                            if(err)
                            {console.log(err.message);}

                            else
                            {
                                console.log('Quantity Successfully Updated!');
                                database.query(updateTransactions, (err, results, fields) => 
                                {
                                    if (err)
                                    {console.log(err.message);}

                                    else
                                    {console.log('Transaction Added Successfully!');}
                                });
                            }
                        });  
                    }
                });
            }
        });
    }

    this.refundTransaction = function()
    {
        database.query(checkProductQuery, (err, results, fields) =>
        {
            if (err)
            {console.log(err.message);}

            else if (results[0].count == 0)
            {console.log('Product does not exist');}

            else
            {
                database.query(checkStockQuery, (err, results, fields) => 
                {
                    if(err)
                    {console.log(err.message);}

                    else if (results[0].count == 0)
                    {console.log('Stock does not exist');}

                    else 
                    {
                        database.query(refundStockQuery, (err, results, fields) =>
                        {
                            if(err)
                            {console.log(err.message);}

                            else
                            {
                                console.log('Quantity Successfully Updated!');
                                database.query(updateTransactions, (err, results, fields) => 
                                {
                                    if (err)
                                    {console.log(err.message);}

                                    else
                                    {console.log('Transaction Added Successfully!');}
                                });
                            }
                        });  
                    }
                });
            }
        });
    }
}

//Basic (imcomplete) Testing of Sale and Refunds
/*let stockaddtest = database.query(`INSERT INTO stock(product_id, quantity, exp_date) VALUES (2, 50, '2019/12/15')`, (err, results, fields) =>
{
    if (err){
        console.log(err.message);
    }
    else{
        console.log('Stock successfully added');
    }
}); */

let saletest = new Transaction(5, 20, `2019/12/15`, 6, 2);
let saletest2 = new Transaction(5, 7, `2019/12/15`, 8, 3);
//saletest2.saleTransaction();
//saletest.saleTransaction();
//saletest.refundTransaction();