//Database connection
const databaseConnection = require('../migrations/DBConnectionDetails');
const database = databaseConnection();

function Transaction (productname, exprdate, quantity)
{
    this.quantitynum = quantity;
    this.exdate = exprdate;
    this.prodname = productname;
    
    let checkProductQuery = `SELECT product_id FROM products WHERE name = '${this.prodname}'`;
    this.saleTransaction = function()
    {
        database.query(checkProductQuery, (err, results, fields) =>
        {
            var finalProduct_id;
            var product_ids = [];
            var stock_id = [];
            if (err)
            {console.log(err.message);}
            else if (results == '')
            {console.log('Product does not exist');}
            else
            {
                for (var i = 0; i <results.length;i++)
                {
                    product_ids.push(results[i].product_id);
                    console.log('Product Found! Product_id: ' + product_ids[i]);
                }
                for (var i = 0; i < product_ids.length;i++)
                {
                    let checkCorrectStockQuery = `SELECT stock_id FROM stock WHERE product_id = '${product_ids[i]}' AND exp_date = '${this.exdate}'`;
                    database.query(checkCorrectStockQuery, (err, results, fields) =>
                    {
                        if(err)
                        {console.log(err.message);}
                        else if (results == '')
                        {}
                        else
                        {
                            stock_id.push(results[0].stock_id);
                            console.log('Stock Found! Stock_id: ' + stock_id[0]);
                            let productidQuery = `SELECT product_id FROM stock WHERE stock_id = '${stock_id[0]}'`;
                            database.query(productidQuery, (err, results, field) =>
                            {
                                finalProduct_id = results[0].product_id;
                            });
                            let checkEnoughStockQuery = `SELECT COUNT(*) as count FROM stock WHERE stock_id ='${stock_id}' AND quantity >= '${this.quantitynum}'`;
                            database.query(checkEnoughStockQuery, (err, results, fields) =>
                            {
                                if(err)
                                {console.log(err.message);}
                                else if(results[0].count == 0)
                                {console.log('Not enough stock');}
                                else
                                {
                                    let saleStockQuery = `UPDATE stock SET quantity = quantity - '${this.quantitynum}'
                                    WHERE stock_id = '${stock_id[0]}'`;
                                    database.query(saleStockQuery, (err, results, fields) =>
                                    {
                                        if(err)
                                        {console.log(err.message);}
                                        else
                                        {
                                            console.log('Quantity Successfully Updated!');
                                            
                                            let salequantitynum = '-' + this.quantitynum;
                                            console.log(salequantitynum);
                                            let updateTransactions = `INSERT INTO transactions(quantity, stock_id, product_id, date)
                                            VALUES('${salequantitynum}', '${stock_id}', '${finalProduct_id}', CURRENT_DATE())`;
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
        });
    }

    this.refundTransaction = function()
    {
        database.query(checkProductQuery, (err, results, fields) =>
        {
            var finalProduct_id;
            var product_ids = [];
            var stock_id = [];
            if (err)
            {console.log(err.message);}
            else if (results == '')
            {console.log('Product does not exist');}
            else
            {
                for (var i = 0; i <results.length;i++)
                {
                    product_ids.push(results[i].product_id);
                    console.log('Product Found! Product_id: ' + product_ids[i]);
                }
                for (var i = 0; i < product_ids.length;i++)
                {
                    let checkCorrectStockQuery = `SELECT stock_id FROM stock WHERE product_id = '${product_ids[i]}' AND exp_date = '${this.exdate}'`;
                    database.query(checkCorrectStockQuery, (err, results, fields) =>
                    {
                        if(err)
                        {console.log(err.message);}
                        else if (results == '')
                        {}
                        else
                        {
                            stock_id.push(results[0].stock_id);
                            console.log('Stock Found! Stock_id: ' + stock_id[0]);
                            let productidQuery = `SELECT product_id FROM stock WHERE stock_id = '${stock_id[0]}'`;
                            database.query(productidQuery, (err, results, field) =>
                            {
                                finalProduct_id = results[0].product_id;
                            });
                            let RefundStockQuery = `UPDATE stock SET quantity = quantity + '${this.quantitynum}'
                            WHERE stock_id = '${stock_id[0]}'`;
                            database.query(RefundStockQuery, (err, results, fields) =>
                            {
                                if(err)
                                {console.log(err.message);}
                                else
                                {
                                    console.log('Quantity Successfully Updated!');
                                    let updateTransactions = `INSERT INTO transactions(quantity, stock_id, product_id, date)
                                    VALUES('${this.quantitynum}', '${stock_id}', '${finalProduct_id}', CURRENT_DATE())`;
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
            }
        });
    }
}

//another way of doing refunds
function refundingTransaction(transaction_id)
{
    this.transac_id = transaction_id;
    var stock_id;
    var quantity; 

    let grabTransactionDataQuery = `SELECT quantity, stock_id, product_id FROM transactions WHERE transaction_id = '${this.transac_id}'`;
    database.query(grabTransactionDataQuery, (err, results, fields) =>
    {
        if (err)
        {console.log(err.message);}
        else if (results == '')
        {console.log('No transaction found');}
        else if (results[0].quantity < 0)
        {console.log('Cannot refund a refunds transaction');}
        else
        {
            rStock_id = results[0].stock_id;
            rQuantity = results[0].quantity;

            let updateTransactionsQuery = `INSERT INTO transactions(quantity, stock_id, product_id, date)
            VALUES('-' + '${rQuantity}', '${rStock_id}', '${results[0].product_id}', CURRENT_DATE())`;
            database.query(updateTransactionsQuery, (err, results, fields) => 
            {
                if (err)
                {console.log(err.message);}
                else
                {console.log('Transaction Added');}
            });

            let updateStockQuery = `UPDATE stock SET quantity = quantity + '${rQuantity}' WHERE stock_id = '${rStock_id}'`;
            database.query(updateStockQuery, (err, results, fields) => 
            {
                if (err)
                {console.log(err.message);}
                else
                {console.log('Stock updated');}
            });
        }
    });
} 

function getTransactionData(callback)
{
    let transactionDataQuery = `SELECT * FROM transactions`;
    database.query(transactionDataQuery, function (err, results)
    {
        var transactionData = []
        if (err)
        {console.log(err.message);}
        else
        {
            for (var i = 0; i < results.length; i++)
            {
                transactionData.push({
                    transaction_id: results[i].transaction_id,
                    quantity: results[i].quantity,
                    date: results[i].date
                });
            }
            console.log('Successfully retrieved transaction data');
        }

        return callback(transactionData);
    }); 
}

getTransactionData(function(transactionData)
{
    console.log('transaction data: ', JSON.stringify(transactionData));
});

//let saletest = new Transaction('panadol', '2012-10-10', 2);
//saletest.saleTransaction();
//refundingTransaction(30);
//saletest.refundTransaction();

module.exports = Transaction;