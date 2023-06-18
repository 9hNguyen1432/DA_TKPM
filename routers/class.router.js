const express = require('express')
const router = express.Router()
const classController =  require("../controllers/class.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")

router.get('/:class_name/import',isNotAuthenticated,classController.importStudent);
router.get('/:class_name/course/:course_name',isNotAuthenticated,classController.loadCourseDetailPage);
router.get('/:class_name/course',isNotAuthenticated,classController.loadCourseListPage);
router.get('/:class_name',isNotAuthenticated,classController.loadStudentListPage);
router.get('/',isNotAuthenticated,classController.loadPage)
module.exports = router;