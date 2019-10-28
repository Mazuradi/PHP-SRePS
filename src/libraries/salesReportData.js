//Database connection
const databaseConnection = require('../migrations/DBConnectionDetails');
const database = databaseConnection();

const transactiondata = require('../controllers/objectTransaction');
const stockdata = require('../controllers/objectStock');
const productdata = require('../controllers/objectProduct');

//tests();

async function tests() {
	var currentPeriodsPurchasingQtys = await getCurrentPeriodsPurchasingQtys();
	console.log('current periods purchasing qtys', currentPeriodsPurchasingQtys);

	var lastPeriodsSalesAlantytics = await getLastPeriodsSalesAlantytics();
	console.log('last periods sales analytics', lastPeriodsSalesAlantytics);
}

async function getCurrentPeriodsPurchasingQtys() {
	var currentPeriodsPurchasingQtys = [];

	var productsData = await productdata.getProductsData();
	var stockData = await stockdata.getStockData();
	var transactionsData = await transactiondata.getTransactionsData();

	var lastFourWeekPeriodDates = getLastFourWeekPeriodDates();
	var startOfFourWeekPeriodDate = lastFourWeekPeriodDates[0];
	var endOfFourWeekPeriodDate = lastFourWeekPeriodDates[1];

	for (var i = 0; i < productsData.length; i++) {
		var sumOfProductTransactionQtysForLastPeriod = 0;
		for (var c = 0; c < transactionsData.length; c++) {
			if (productsData[i].id == transactionsData[c].productId) {
				transactionsData[c].date = fixTimeZoneOffset(transactionsData[c].date);
				var transactionInLastFourWeekPeriod = getWithinDatesBool(
					transactionsData[c].date,
					startOfFourWeekPeriodDate,
					endOfFourWeekPeriodDate
				);
				if (transactionInLastFourWeekPeriod) {
					sumOfProductTransactionQtysForLastPeriod += transactionsData[c].qty;
				}
			}
		}

		var sumOfStockForProduct = 0;
		for (var c = 0; c < stockData.length; c++) {
			if (productsData[i].id == stockData[c].productId) {
				sumOfStockForProduct += stockData[c].quantity;
			}
		}

		var buffer = sumOfProductTransactionQtysForLastPeriod * 0.2;
		var purchaseQty = sumOfProductTransactionQtysForLastPeriod - sumOfStockForProduct + buffer;
		if (purchaseQty < 0) {
			purchaseQty = 0;
		} else {
			purchaseQty = Math.round(purchaseQty);
		}

		currentPeriodsPurchasingQtys.push({
			productId: productsData[i].id,
			productName: productsData[i].name,
			purchaseQty: purchaseQty
		});
	}

	currentPeriodsPurchasingQtys.sort(function(a, b) {
		return a.productId - b.productId;
	});

	return currentPeriodsPurchasingQtys;
}

async function getLastPeriodsSalesAlantytics() {
	var lastPeriodsSales = await getLastPeriodsSales();

	lastPeriodsSales.sort(function(a, b) {
		return a.transactionsSum - b.transactionsSum;
	});

	var sizeOfPopularityClass = lastPeriodsSales.length / 5;
	sizeOfPopularityClass = Math.round(sizeOfPopularityClass);

	var loopCount = 0;
	var popularityNumber = 0;
	var lastPeriodsSalesAlantytics = [];

	for (var i = 0; i < lastPeriodsSales.length; i++) {
		if (popularityNumber < 4) {
			if (i == 0) {
				if (loopCount == sizeOfPopularityClass) {
					loopCount = 1;
					popularityNumber++;
				} else {
					loopCount++;
				}
			} else {
				if (loopCount == sizeOfPopularityClass) {
					if (lastPeriodsSales[i].transactionsSum != lastPeriodsSales[i - 1].transactionsSum) {
						loopCount = 1;
						popularityNumber++;
					}
				} else {
					loopCount++;
				}
			}
		}

		lastPeriodsSalesAlantytics.push({
			productId: lastPeriodsSales[i].productId,
			productName: lastPeriodsSales[i].productName,
			unitsSold: lastPeriodsSales[i].transactionsSum,
			revenue: lastPeriodsSales[i].revenue,
			popularity: popularityNumber
		});
	}

	lastPeriodsSalesAlantytics.sort(function(a, b) {
		return a.productId - b.productId;
	});

	//commented out lines bellow are for testing popularity
	/*lastPeriodsSalesAlantytics.sort(function(a, b) {
		return a.popularity - b.popularity;
	});
	for (var i=0; i<lastPeriodsSalesAlantytics.length; i++) {
		console.log('lastPeriodsSalesAlantytics[i]', lastPeriodsSalesAlantytics[i].popularity);
	}*/

	return lastPeriodsSalesAlantytics;
}

async function getLastPeriodsSales() {
	var productsData = await productdata.getProductsData();
	var transactionsData = await transactiondata.getTransactionsData();

	var lastFourWeekPeriodDates = getLastFourWeekPeriodDates();
	var startOfFourWeekPeriodDate = lastFourWeekPeriodDates[0];
	var endOfFourWeekPeriodDate = lastFourWeekPeriodDates[1];

	var lastPeriodsSales = [];
	for (var i = 0; i < productsData.length; i++) {
		var sumOfProductTransactionQtysForLastPeriod = 0;
		for (var c = 0; c < transactionsData.length; c++) {
			if (productsData[i].id == transactionsData[c].productId) {
				transactionsData[c].date = fixTimeZoneOffset(transactionsData[c].date);
				var transactionInLastFourWeekPeriod = getWithinDatesBool(
					transactionsData[c].date,
					startOfFourWeekPeriodDate,
					endOfFourWeekPeriodDate
				);
				if (transactionInLastFourWeekPeriod) {
					sumOfProductTransactionQtysForLastPeriod += transactionsData[c].qty;
				}
			}
		}

		var transactionSumWholesalePrice = sumOfProductTransactionQtysForLastPeriod * productsData[i].wholesalePrice;
		var transactionSumRetailPrice = sumOfProductTransactionQtysForLastPeriod * productsData[i].retailPrice;
		var revenue = transactionSumRetailPrice - transactionSumWholesalePrice;
		revenue = revenue.toFixed(2);

		lastPeriodsSales.push({
			productId: productsData[i].id,
			productName: productsData[i].name,
			revenue: revenue,
			transactionsSum: sumOfProductTransactionQtysForLastPeriod
		});
	}

	return lastPeriodsSales;
}

function getLastFourWeekPeriodDates() {
	var now = new Date();
	now = fixTimeZoneOffset(now);
	var todayDateObj = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
	var daysToSubtractFromTodaysDateToGetLastSunday = todayDateObj.getDay();
	var endOfFourWeekPeriodDateObj = subtractDays(todayDateObj, daysToSubtractFromTodaysDateToGetLastSunday);
	var startOfFourWeekPeriodDateObj = subtractFourWeeks(endOfFourWeekPeriodDateObj);

	return [ startOfFourWeekPeriodDateObj, endOfFourWeekPeriodDateObj ];
}

function fixTimeZoneOffset(date) {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

function subtractDays(date, days) {
	return new Date(date.getTime() - 60000 * 60 * 24 * days);
}

function subtractFourWeeks(date) {
	return new Date(date.getTime() - 60000 * 60 * 24 * 7 * 4);
}

function getWithinDatesBool(dateObj, fromDateObj, toDateObj) {
	var date = dateObj.getTime();
	var fromDate = fromDateObj.getTime();
	var toDate = toDateObj.getTime();

	//Returns false if the first date is after the second date
	if (fromDate > date) return false;

	//Returns false if the first date is after the second date
	if (date > toDate) return false;

	return true;
}

module.exports = { getLastPeriodsSalesAlantytics };
