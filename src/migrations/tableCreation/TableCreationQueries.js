//Database connection
const products= `CREATE TABLE IF NOT EXISTS products(product_id INT PRIMARY KEY AUTO_INCREMENT,
                                name VARCHAR(255) NOT NULL,
                                wholesale_price DECIMAL(6,3) NOT NULL,
                                retail_price DECIMAL(6,3) NOT NULL)`;;

const stock= `CREATE TABLE IF NOT EXISTS stock(stock_id INT PRIMARY KEY AUTO_INCREMENT,
                                product_id INT NOT NULL,
                                quantity INT NOT NULL,
                                exp_date DATE NOT NULL)`;

const transactions = `CREATE TABLE IF NOT EXISTS transactions(transaction_id INT PRIMARY KEY AUTO_INCREMENT,
                                sale_id INT NOT NULL,
                                quantity INT NOT NULL,
                                date DATE NOT NULL,
                                stock_id INT NOT NULL,
                                product_id INT NOT NULL)`;

module.exports={products,stock,transactions}