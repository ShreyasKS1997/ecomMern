const express = require('express');

const cron = require('node-cron');

const app = express();

const Middleware = require('./Middleware/error');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');

const path = require('path');

//config
require('dotenv').config({ path: 'server/config/config.env' });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

/*var log = console.log;
console.log = function () {
  log.apply(console, arguments);
  console.trace();
};*/

//app.use(express.static(path.join(__dirname, '../frontend/build')));

/*app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});*/

// Middleware to handle errors
app.use(Middleware);

module.exports = app;
