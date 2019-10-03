require('dotenv').config();

const databaseInfo = {
  host: process.env.DB_HOSTNAME || 'localhost',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password1!',
  database: process.env.DB_NAME || 'phpsrep'};

module.exports = databaseInfo;