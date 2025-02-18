const Course = require('../models/coursesModel');

// Obtener todos los cursos
const GetAllCourses = async () => {
  return await Course.find();
};

// Crear un nuevo curso
const CreateCourse = async (courseData) => {
  const course = new Course(courseData);
  return await course.save();
};

// Actualizar un curso existente
const UpdateCourse = async (id, updateData) => {
  const course = await Course.findById(id);
  if (!course) throw new Error('Course not found');
  
  course.name = updateData.name || course.name;
  course.credits = updateData.credits || course.credits;
  course.teacher = updateData.teacher || course.teacher;

  return await course.save();
};

// Eliminar un curso
const DeleteCourse = async (id) => {
  const course = await Course.findByIdAndDelete(id);
  if (!course) throw new Error('Course not found');
  return course;
};

module.exports = {
  GetAllCourses,
  CreateCourse,
  UpdateCourse,
  DeleteCourse
};
