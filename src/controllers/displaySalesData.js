//database connection
const databaseConnection = require('../migrations/DBConnectionDetails');
const database = databaseConnection();

displaySales = () => {
    let Query = `SELECT * FROM transactions`;
    database.query(Query, (err, results, fields) =>
    {
        if (err) 
        {console.log(err.message);}
        else
        {
            var salesData = [];
            for (let i = 0; i <results.length;i++)
            {
                salesData.push({
                    transaction_id: results[i].transaction_id,
				    sale_id: results[i].sale_id,
				    quantity: results[i].quantity,
				    date: results[i].date,
				    stock_id: results[i].stock_id,
				    product_id: results[i].product_id
                })
            }
            console.log(salesData);
        }
    });
};

module.exports = {displaySales};