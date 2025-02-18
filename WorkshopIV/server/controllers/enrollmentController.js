const asyncHandler = require('express-async-handler');
const enrollmentService = require('../services/enrollmentServices');

const GetAllEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await enrollmentService.GetAllEnrollments();
  res.status(200).json(enrollments);
});

const CreateEnrollment = asyncHandler(async (req, res) => {
  const { course, teacher, student } = req.body;

  if (!course || !teacher || !student) {
    res.status(400);
    throw new Error('Los campos "course", "teacher" y "student" son requeridos');
  }

  const enrollmentData = { course, teacher, student };
  const newEnrollment = await enrollmentService.CreateEnrollment(enrollmentData);
  res.status(201).json(newEnrollment);
});

const UpdateEnrollment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedEnrollment = await enrollmentService.UpdateEnrollment(id, updateData);
    res.status(200).json(updatedEnrollment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const DeleteEnrollment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  try {
    await enrollmentService.DeleteEnrollment(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  GetAllEnrollments,
  CreateEnrollment,
  UpdateEnrollment,
  DeleteEnrollment
};
