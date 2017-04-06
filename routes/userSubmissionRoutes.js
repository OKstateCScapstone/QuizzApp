const express = require('express');
const config = require('../config');
const multer = require('multer');
const parts = multer();
const wrap = require('co-express');
const co = require('co');
const QuestionController = require('../controllers/questionController');
const TestQuestions = require('../testObjects/TestQuestions');

const UserSubmission = require("../models/userSubmission");
const RunnerController = require('../controllers/runnerController');

module.exports = function (app) {

    app.post('/user_submission', parts.array(), wrap(function *(req, res) {
        const questionId = req.body.questionId;
        const userName = req.body.userId;
        const userCode = req.body.userCode;

        co(function *() {

            // get question from the database
            var question = yield QuestionController.findById(questionId);

            // If the outputs of the complete solution are not stored
            // run them now and store in the database
            if (!question.testCases[0].output) {
                yield RunnerController.compileAndRunTestCases(
                    question, "dummyUser", "", true);
                yield QuestionController.save(question);
            }

            // Compile and run test cases for question
            var runStatus = yield RunnerController.compileAndRunTestCases(
                question, userName, userCode, false);

            // Determine which test cases are correct
            var testCases = question.testCases;
            var results = [];
            var numCorrect = 0;
            for (var i=0; i<runStatus.length; i++) {
                if (testCases[i].output == runStatus[i]) {
                    results.push(true);
                    numCorrect++;
                }
                else {
                    results.push(false);
                }
            }
            var score = question.points * (numCorrect / question.testCases.length);

            // Create User Submission object
            var userSubmission = {
                question: question,
                username: userName,
                code: userCode,
                results: results,
                score: score
            };
            yield RunnerController.saveUserSubmission(userSubmission);

            // Return the user submission object
            res.status(200).json({
                success: true,
                data: userSubmission
            });
        }).catch(function (err) {
            console.log(err.stack);
            res.status(500).json({
                message: err.message
            });
        });
    }));
};
