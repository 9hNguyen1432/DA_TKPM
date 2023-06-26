const express = require('express')
const router = express.Router()
const classController =  require("../controllers/class.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")
//
var multer = require('multer')
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.get('/:class_name/student/:student_id',isNotAuthenticated, classController.getStudent);
router.post('/:class_name/add_a_student',isNotAuthenticated, classController.addStudent);
router.post('/:class_name/delete_student/:student_id',isNotAuthenticated, classController.deleteStudent);
router.get('/:class_name/modify_student/:student_id',isNotAuthenticated, classController.getInfoStudent);
router.post('/:class_name/modify_student/:student_id',isNotAuthenticated, classController.modifyStudent);
router.get('/:class_name/import',isNotAuthenticated,classController.importStudentRender);
router.post('/:class_name/import',isNotAuthenticated, upload.fields([{name: "danhsachhocsinh"}]),classController.importStudentHandle);
router.get('/:class_name/course/:course_name',isNotAuthenticated,classController.loadCourseDetailPage);

router.get('/:class_name/course/:course_name/import',isNotAuthenticated,classController.importScoreRender);
router.post('/:class_name/course/:course_name/import',isNotAuthenticated, upload.fields([{name: "danhsachhocsinh"}]),classController.importScoreHandle);
router.get('/:class_name/course',isNotAuthenticated,classController.loadCourseListPage);
router.get('/:class_name',isNotAuthenticated,classController.loadStudentListPage);
router.get('/',isNotAuthenticated,classController.loadPage);
router.get('/:class_name/export/list_student',isNotAuthenticated,classController.downloadStudentsOfClass_CSV);
router.get('/:class_name/course/:course_name/download-transcript',isNotAuthenticated, classController.downloadTranscriptOfSubject_CSV);
router.post('/add_class',isNotAuthenticated,classController.addClass)
router.post('/delete_class',isNotAuthenticated,classController.deleteClass)
module.exports = router;