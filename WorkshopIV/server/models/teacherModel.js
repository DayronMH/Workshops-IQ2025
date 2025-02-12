const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teachers = new Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    cedula: {
        required: true,
        type: Number
    },
    age: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('teachers', teachers)