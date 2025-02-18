const asyncHandler = require('express-async-handler');
const courseService = require('../services/courseServices');

const GetAllCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.GetAllCourses();
  res.status(200).json(courses);
});

const CreateCourse = asyncHandler(async (req, res) => {
  const { name, credits, teacher } = req.body;

  if (!name || !credits) {
    res.status(400);
    throw new Error('Los campos "name" y "credits" son requeridos');
  }

  const courseData = { name, credits, teacher };
  const newCourse = await courseService.CreateCourse(courseData);
  res.status(201).json(newCourse);
});

const UpdateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedCourse = await courseService.UpdateCourse(id, updateData);
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const DeleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  try {
    await courseService.DeleteCourse(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  GetAllCourses,
  CreateCourse,
  UpdateCourse,
  DeleteCourse
};
