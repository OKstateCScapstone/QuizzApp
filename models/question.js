/**
 * Created by mgabilhe on 1/23/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    cliArguments: String,
    inputFiles: [String],
    outputFiles: [String],
    publicTestCase: String,
    codeFile: String,
    completeSolution: String,
    active: Boolean,
    activeDate: {
        type: Date,
        default: Date.now(),
        index: true
    },
    dueDate: {
        type: Date,
        default: Date.now(),
        index: true
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        index: true
    }
});

module.exports = mongoose.model('Question', questionSchema);