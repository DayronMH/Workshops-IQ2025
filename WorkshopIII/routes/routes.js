const express = require('express');
const router = express.Router();
const {
  teacherGetAll,
  teacherGetOne,
  teacherPost,
  teacherPatch,
  teacherDelete
} = require('../server/controllers/teacherController');

router.post('/createteachers', teacherPost);
router.get('/getAll', teacherGetAll);
router.get('/getOne/:id', teacherGetOne);
router.put('/update/:id', teacherPatch);
router.delete('/delete/:id', teacherDelete);

module.exports = router;