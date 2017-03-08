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
    // The user who owns this question. Only the user is allowed to update/delete
    username: {
        type: String,
        index: true,
        required: true
    },
    language: {
        type: String,
        default: "java"
    },
    // The type of problem (Algorithm's, data structures, math, etc.)
    topics: String,
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
    // String containing what we show to the user
    starterCode: String,
    // The path of the file containing the completeSolution of the problem
    completeSolution: String,
    //Whether this question is active for grade or not
    active: Boolean,
    // The date this question will go active for grade
    activeDate: {
        type: Date,
        default: new Date(),
        index: true
    },
    // The date that this question is due (will become inactive after the due date)
    dueDate: {
        type: Date,
        default: new Date(),
        index: true
    },
    // Last time changes where made
    updatedAt: {
        type: Date,
        default: new Date(),
        index: true
    }
});

module.exports = mongoose.model('Question', questionSchema);