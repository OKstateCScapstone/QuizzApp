const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    resetCode: {
        type: String,
        required: true,
        index: true
    }
});

module.exports = mongoose.model('ResetPassword', resetPasswordSchema);