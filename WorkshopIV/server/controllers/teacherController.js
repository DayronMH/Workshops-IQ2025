const Teacher = require('../models/teacherModel'); // Modelo de Teacher


const GetAllTeachers= async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const PostTeacher = async (req, res) => {
  try {
    const teacher = new Teacher({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      cedula: req.body.cedula,
      age: req.body.age
    });
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un teacher
const PatchTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    teacher.first_name = req.body.first_name || teacher.first_name;
    teacher.last_name = req.body.last_name || teacher.last_name;
    teacher.cedula = req.body.cedula || teacher.cedula;
    teacher.age = req.body.age || teacher.age;

    const updatedTeacher = await teacher.save();
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const DeleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetAllTeachers,
  PostTeacher,
  PatchTeacher,
  DeleteTeacher
};
