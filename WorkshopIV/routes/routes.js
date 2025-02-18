const express = require('express');
const router = express.Router();
const {
  GetAllTeachers,
  CreateTeacher,
  UpdateTeacher,
  DeleteTeacher
} = require('../server/controllers/teacherController');

const {
  GetAllCourses,
  CreateCourse,
  UpdateCourse,
  DeleteCourse
} = require('../server/controllers/coursesController');

const {
  GetAllEnrollments,
  CreateEnrollment,
  UpdateEnrollment,
  DeleteEnrollment
} = require('../server/controllers/enrollmentController');

router.post('/createTeacher', CreateTeacher);
router.get('/getTeachers', GetAllTeachers);
router.put('/updateTeacher/:id', UpdateTeacher);
router.delete('/deleteTeacher/:id', DeleteTeacher);
router.post('/createCourse',  CreateCourse);
router.get('/getCourses', GetAllCourses);
router.put('/updateCourse/:id', UpdateCourse);
router.delete('/deletecourse/:id', DeleteCourse);
router.get('/getEnrollments', GetAllEnrollments);
router.post('/createEnrollment', CreateEnrollment);
router.put('/updateEnrollment', UpdateEnrollment);
router.delete('/deleteEnrollment', DeleteEnrollment);

module.exports = router;