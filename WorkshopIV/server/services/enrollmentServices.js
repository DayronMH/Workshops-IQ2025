const Enrollment = require('../models/enrollmentModel');

const GetAllEnrollments = async () => {
  return await Enrollment.find()
    .populate('course', 'name') // Obtiene solo el nombre del curso
    .populate('teacher', 'first_name last_name'); // Obtiene solo el nombre y apellido del profesor
};

const CreateEnrollment = async (enrollmentData) => {
  const newEnrollment = new Enrollment(enrollmentData);
  return await newEnrollment.save();
};

const UpdateEnrollment = async (id, updateData) => {
  const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedEnrollment) {
    throw new Error('Inscripción no encontrada');
  }
  return updatedEnrollment;
};

const DeleteEnrollment = async (id) => {
  const deletedEnrollment = await Enrollment.findByIdAndDelete(id);
  if (!deletedEnrollment) {
    throw new Error('Inscripción no encontrada');
  }
};

module.exports = {
  GetAllEnrollments,
  CreateEnrollment,
  UpdateEnrollment,
  DeleteEnrollment
};
