const Course = require('../models/coursesModel'); 

const GetAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo curso
const PostCourse = async (req, res) => {
  try {
    const course = new Course({
      name: req.body.name,
      credits: req.body.credits
    });
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const PatchCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    course.name = req.body.name || teacher.name;
    course.credits = req.body.credits|| teacher.credits;
    course.teacher = req.body.teacher || teacher.teacher;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const DeleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetAllCourses,
  PostCourse,
  PatchCourse,
  DeleteCourse
};
