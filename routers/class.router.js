const express = require('express')
const router = express.Router()
const classController =  require("../controllers/class.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")
//
var multer = require('multer')
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.get('/:class_name/import',isNotAuthenticated,classController.importStudentRender);
router.post('/:class_name/import',isNotAuthenticated, upload.fields([{name: "danhsachhocsinh"}]),classController.importStudentHandle);
router.get('/:class_name/course/:course_name',isNotAuthenticated,classController.loadCourseDetailPage);
router.get('/:class_name/course',isNotAuthenticated,classController.loadCourseListPage);
router.get('/:class_name',isNotAuthenticated,classController.loadStudentListPage);
router.get('/',isNotAuthenticated,classController.loadPage);
router.get('/:class_name/export',isNotAuthenticated,classController.downloadStudentsOfClass_CSV);
router.get('/class/:class_name/course/:course_name/download-transcript',isNotAuthenticated, classController.downloadTranscriptOfSubject_CSV);

module.exports = router;