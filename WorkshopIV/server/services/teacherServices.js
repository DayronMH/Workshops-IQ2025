const Teacher = require('../models/teacherModel');

const GetAllTeachers = async () => {
    return await Teacher.find();
};

const CreateTeacher = async (teacherData) => {
    const teacher = new Teacher(teacherData);
    return await teacher.save();
};

const UpdateTeacher = async (id, updateData) => {
    return await Teacher.findByIdAndUpdate(id, updateData, { new: true });
};

const DeleteTeacher = async (id) => {
    return await Teacher.findByIdAndDelete(id);
};

module.exports = {
    GetAllTeachers,
    CreateTeacher,
    UpdateTeacher,
    DeleteTeacher
};