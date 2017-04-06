const express = require('express');
const multer = require('multer');
const parts = multer();
const wrap = require('co-express');
const co = require('co');
const Course = require('../models/course');

// Only use this as a sample template when starting a new routes file
module.exports = function (app) {
    app.get('/courses/:instructor', parts.array(), wrap(function * (req, res) {
        var courses = yield Course.find({instructor: req.params.instructor}).exec();
        res.json(courses);
    }));

    app.post('/courses', wrap(function *(req, res) {
        co(function *() {
            const course = new Course(req.body);
            yield course.save();
            res.status(200).json(course);
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }));

    app.get('/courses/single/:id', parts.array(), wrap(function * (req, res) {
        const q = {_id: req.params.id};
        const course = yield Course.findOne(q).exec();
        res.json(course);
    }));
};