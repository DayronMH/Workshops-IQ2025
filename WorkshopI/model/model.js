const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const users = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('users', users)