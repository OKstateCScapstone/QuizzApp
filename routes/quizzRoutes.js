const express = require('express');
const multer = require('multer');
const parts = multer();
const wrap = require('co-express');
const co = require('co');
const Quizz = require('../models/quizz');

// Only use this as a sample template when starting a new routes file
module.exports = function (app) {
    app.get('/quizzes/:instructor', parts.array(), wrap(function * (req, res) {
        var courses = yield Quizz.find({instructor: req.params.instructor}).exec();
        res.json(courses);
    }));

    app.post('/quizzes', wrap(function *(req, res) {
        co(function *() {
            const quizz = new Quizz(req.body);
            yield quizz.save();
            res.status(200).json(quizz);
        }).catch(function (err) {
            console.log(err.stack);
            res.status(500).json(err);
        });
    }));
};