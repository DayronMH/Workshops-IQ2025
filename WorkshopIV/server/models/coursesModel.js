const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { required: true, type: String },
    credits: { required: true, type: Number },
    teacher: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher"
    }
});

module.exports = mongoose.model('Course', CourseSchema); 