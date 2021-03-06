// PACKAGES //
var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

// SERVER FILES //
var index = require('./server/routes/index');

// APP //
var app = express();

// VIEW ENGINE //
app.set('view engine', 'html');
app.engine('html', function(path, options, callback) {
    fs.readFile(path, 'utf-8', callback);
});

/*Configure the multer.*/

// MIDDLEWARE //
app.use(morgan('dev')); // logger
app.use(express.static(__dirname + '/client')); // set static folder
app.use(favicon(__dirname + '/client/assets/img/favicon.ico')); // favicon
app.use(bodyParser.json()); // parse json
app.use(bodyParser.urlencoded({ extended: true })); // parse forms
app.use('/', index); // index routes
app.use(function(err, req, res, next) { res.status(err.status || 500); }); // general error handler


module.exports = app;
