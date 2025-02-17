const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    first_name: { required: true, type: String },
    last_name: { required: true, type: String },
    cedula: { required: true, type: Number, unique: true },
    age: { required: true, type: Number },
    specialty: { required: true, type: String } 
});

module.exports = mongoose.model('Teacher', TeacherSchema)