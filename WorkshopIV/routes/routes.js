const express = require('express');
const router = express.Router();
const {
  GetAllTeachers,
  PostTeacher,
  PatchTeacher,
  DeleteTeacher
} = require('../server/controllers/teacherController');

const {
  GetAllCourses,
  PostCourse,
  PatchCourse,
  DeleteCourse
} = require('../server/controllers/coursesController');

router.post('/createTeacher', PostTeacher);
router.get('/getTeachers', GetAllTeachers);
router.put('/updateTeacher/:id', PatchTeacher);
router.delete('/deleteTeacher/:id', DeleteTeacher);
router.post('/createCourse',  PostCourse);
router.get('/getCourses', GetAllCourses);
router.put('/updateCourse/:id', PatchCourse);
router.delete('/Deletecourse/:id', DeleteCourse);

module.exports = router;