const express = require('express');
const config = require('../config');
const multer = require('multer');
const uploadsPath = config.UPLOADS_PATH || process.env.UPLOAD_PATH;
const upload = multer({dest: uploadsPath});
const parts = multer();
const wrap = require('co-express');
const co = require('co');
const Question = require('../models/question');
const FileUploadController = require('../controllers/fileUploadController');
const QuestionsController = require('../controllers/questionController');
const TestQuestions = require('../testObjects/TestQuestions');
const QuestionParser = require('../parser/parser');

const VARS = require('../test/testVariables');
const RunnerController = require('../controllers/runnerController');

module.exports = function (app) {
    app.post('/upload_file', upload.single('file'), wrap(function *(req, res) {
        const file = req.file;
        const user = req.query.user;
        const path = file.filename;
        co(function *() {
            const fileContents = yield FileUploadController.readFile(path);
            var questionContents = QuestionParser.processFile(fileContents);
            var question = yield QuestionsController.saveParsedQuestion(questionContents, user);
            question.completeSolution = QuestionParser.saveSolutionForQuestion(question._id, fileContents);
            yield question.save();
            yield FileUploadController.saveFile(fileContents, question._id, "original.txt");
            FileUploadController.removeFile(path);
            res.status(200).json({
                success: true,
                data: question
            });
        }).catch(function (err) {
            console.log(err.stack);
            res.status(500).json({
                message: err.message
            });
        });
    }));

    app.get('/questions', wrap(function *(req, res) {
        co(function *() {
            const query = req.query || {};
            const questions = yield QuestionsController.findQuestions(query);
            res.status(200).json(questions)
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }));

    app.get('/questions/:id', wrap(function *(req, res) {
        co(function *() {
            const id = req.params.id;
            const question = yield QuestionsController.findById(id);
            question.completeSolution = yield FileUploadController.readFileFromFullPath(question.completeSolution);
            res.status(200).json(question);
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }));

    app.post('/questions', wrap(function *(req, res) {
        co(function *() {
            const question = yield QuestionsController.save(req.body);
            res.status(200).json(question)
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }));

    app.put('/questions', wrap(function *(req, res) {
        co(function *() {
            const id = req.body._id;
            const question = yield QuestionsController.update(id, req.body);
            res.status(200).json(question)
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }));

    app.get('/dummy/questions/:id', wrap(function *(req, res) {
        res.status(200).json(TestQuestions.singleQuestion);
    }));

    app.post('dummy/questions', wrap(function *(req, res) {
        const question = new Question(req.body);
        res.status(200).json(question);
    }));

    app.put('dummy/questions', wrap(function *(req, res) {
        const question = new Question(req.body);
        res.status(200).json(question);
    }));


    app.get('/question_test', parts.array(), wrap(function * (req, res) {
        const question = TestQuestions.singleQuestion;
        const completeSolution = question.completeSolution;
        const goodUserCode = question.goodUserCode;
        const goodSplicedCode = question.goodSplicedCode;
        const splicedCode = RunnerController.spliceCode(completeSolution, goodUserCode, "@1");
        const userCode = question.goodUserCode;

        co(function * () {
            var result = yield RunnerController.compileAndRunTestCases(question, "test", userCode, false);
            res.json(result);
        }).catch(function(err) {

            res.status(500).json(err);
        });
    }));
};