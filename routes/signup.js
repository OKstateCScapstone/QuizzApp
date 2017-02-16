/**
 * Created by thotasairam on 2/15/17.
 */
const express = require('express');
const multer = require('multer');
const parts = multer();
const wrap = require('co-express');
var path    = require("path");


// Only use this as a sample template when starting a new routes file
module.exports = function (app) {

    app.get('/signup', parts.array(), wrap(function * (req, res) {

        res.sendFile(path.join(__dirname+'/../public/views/login-signup/signup.html'));

    }));
};