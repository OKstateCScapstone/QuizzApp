const express = require('express');
const config = require('../config');
const multer = require('multer');
const uploadsPath = config.UPLOADS_PATH || process.env.UPLOAD_PATH;
const upload = multer({dest: uploadsPath });
const parts = multer();
const wrap = require('co-express');
const co = require('co');
const FileUploadController = require('../controllers/fileUploadController');

module.exports = function (app) {
    app.post('/upload_file', upload.single('file'), wrap(function *(req, res) {
        const file = req.file;
        const user = req.query.user;
        const path = file.filename;
        co(function *() {
            const message = yield FileUploadController.readFile(path);
            //TODO process the file
            //TODO persist question to db
            //TODO return question for user preview
            res.status(200).json({
                success: true,
                user: user,
                data: message
            });
        }).catch(function (err) {
            res.status(500).json({
                message: err.message
            });
        });
    }));
};