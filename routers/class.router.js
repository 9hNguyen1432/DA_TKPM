const express = require('express')
const router = express.Router()
const classController =  require("../controllers/class.controller");

router.get('/',classController.loadPage)

router.get('/:class_name',classController.loadStudentListPage)

router.get('/:class_name/course',classController.loadCourseListPage)

router.get('/:class_name/course/:course_name',classController.loadCourseDetailPage)

module.exports = router;