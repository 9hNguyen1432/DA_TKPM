const express = require('express')
const router = express.Router()
const classController =  require("../controllers/class.controller");

router.get('/:class_name/import',classController.importStudentRender);
router.post('/:class_name/import',classController.importStudentHandle);
router.get('/:class_name/course/:course_name',classController.loadCourseDetailPage);
router.get('/:class_name/course',classController.loadCourseListPage);
router.get('/:class_name',classController.loadStudentListPage);
router.get('/',classController.loadPage)
module.exports = router;