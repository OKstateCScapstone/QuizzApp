const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testCaseSchema = new Schema({
    // Input of the program
    input: String,
    // Output that should be printed to the console
    output: String,
    // Indicates if this test case input/output should be read from a file or just passed into arguments
    isFile: Boolean,
    // Indicates where this test case is shown to the user or not
    public: Boolean
});

module.exports = mongoose.model('TestCase', testCaseSchema);