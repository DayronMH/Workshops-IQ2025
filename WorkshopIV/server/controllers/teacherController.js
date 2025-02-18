const asyncHandler = require('express-async-handler');
const teacherService = require('../services/teacherServices');

const GetAllTeachers = asyncHandler(async (req, res) => {
    const teachers = await teacherService.GetAllTeachers();
    res.status(200).json(teachers);
});

const CreateTeacher = asyncHandler(async (req, res) => {
    const { first_name, last_name, cedula, age, specialty } = req.body;

    if (!first_name || !last_name || !cedula || !age || !specialty) {
        res.status(400);
        throw new Error('Todos los campos son requeridos');
    }

    const newTeacher = await teacherService.CreateTeacher(req.body);
    res.status(201).json(newTeacher);
});

const UpdateTeacher = asyncHandler(async (req, res) => {
    const updatedTeacher = await teacherService.UpdateTeacher(req.params.id, req.body);
    if (!updatedTeacher) {
        res.status(404);
        throw new Error('Profesor no encontrado');
    }
    res.json(updatedTeacher);
});

const DeleteTeacher = asyncHandler(async (req, res) => {
    const teacherDeleted = await teacherService.DeleteTeacher(req.params.id);
    if (!teacherDeleted) {
        res.status(404);
        throw new Error('Profesor no encontrado');
    }
    res.status(204).send();
});

module.exports = {
    GetAllTeachers,
    CreateTeacher,
    UpdateTeacher,
    DeleteTeacher
};
