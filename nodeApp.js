//Express App Creation
const express = require('express');
const app = express();

//Middleware for post method - bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route packages / scripts
const productRoutes = require('./src/api/routes/product');
const stockRoutes = require('./src/api/routes/stock');
const transactionRoutes = require('./src/api/routes/transaction');
const csvRoutes = require('./src/api/routes/csvroutes');

//Routes to handle requests
app.use('/product', productRoutes);
app.use('/stock', stockRoutes);
app.use('/transaction', transactionRoutes);
app.use('/csvdata', csvRoutes);

//----------Homepage---------------------------
app.get('/', (req, res) => {
	res.sendFile('home.html', { root: './' });
});

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		err: {
			message: err.message
		}
	});
});

app.listen(1337);
