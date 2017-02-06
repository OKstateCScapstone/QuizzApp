const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const questionSchema = new Schema({
    // Title of the problem
    title: {
        type: String,
        required: true
    },
    // Text of the body of the problem
    body: {
        type: String,
        required: true
    },
    // The type of problem (Algorithm's, data structures, math, etc.)
    problemType: String,
    // Categories to which this problem belongs to
    categories: [String],
    // The difficulty of this question
    difficulty: {
        type: String,
        enum: DIFFICULTIES,
        default: DIFFICULTIES[0],
        required: true,
        index: true
    },
    // How many points this assignment is worth for students
    points: Number,
    // Cli arguments used by the program
    cliArguments: String,
    // Test cases for this specific program
    testCases: [{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'TestCase'
    }],
    // Path of the file with the code to be show to students
    codeFile: String,
    // The path of the file containing the completeSolution of the problem
    completeSolution: String,
    //Whether this question is active for grade or not
    active: Boolean,
    // The date this question will go active for grade
    activeDate: {
        type: Date,
        default: Date.now(),
        index: true
    },
    // The date that this question is due (will become inactive after the due date)
    dueDate: {
        type: Date,
        default: Date.now(),
        index: true
    },
    // Last time changes where made
    updatedAt: {
        type: Date,
        default: Date.now(),
        index: true
    }
});

module.exports = mongoose.model('Question', questionSchema);