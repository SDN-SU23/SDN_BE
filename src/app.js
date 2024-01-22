const helmet = require('helmet');
const compression = require('compression');
const express = require('express');
const app = express();
// init middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// init route
app.use('v1/api', require('./routes/index'));
// init db
require('./dbs/init.mongoDB');
// init global variable
const config = require('./configs/index');
global.config = config;

module.exports = app;