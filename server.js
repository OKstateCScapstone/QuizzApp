/**
 * Created by mgabilhe on 1/23/17.
 */

var fs = require('fs');
var compression = require('compression');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var app = express();
var routes = express.Router();

var PORT = process.env.PORT || 3000;
var DEBUG = process.env.DEBUG || true;
var DB = DEBUG ? config.DEV_DATABASE : config.DATABASE;

mongoose.Promise = global.Promise;
mongoose.connect(DB); // connect to the database

// use morgan to log requests to the console
app.use(morgan('dev'));

// define the static paths for the public directory
app.use('/', express.static(path.join(__dirname, 'public')));

// Define the body parser to accept JSON and url encoded items
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Listen for requests on a specific port
app.listen(PORT);

// Compress middleware
app.use(compression({filter: shouldCompress}));

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
}

// Add all the routes inside the routes folder
require('./routes')(routes);
// apply the routes to our application with the prefix /api
app.use('/api', routes);

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});