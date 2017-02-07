var mongoose = require('mongoose');
const config = require('./config');
const TEST_DATABASE_URL = "mongodb://localhost:27017/test-db";

mongoose.Promise = require('q').Promise;

module.exports.initDB = function (debug) {
    const db = debug ? config.DEV_DATABASE : config.DATABASE;
    mongoose.connect(db); // connect to the database
    mongoose.connection.once('connected', () => {
        console.log(mongoose.Promise);
    });
};

module.exports.initTestDB = function (callback) {
    mongoose.Promise = require('q').Promise;
    mongoose.connect(TEST_DATABASE_URL);
    mongoose.connection.once('connected', () => {
        mongoose.connection.db.dropDatabase(function () {
            callback();
        });
    });
};


