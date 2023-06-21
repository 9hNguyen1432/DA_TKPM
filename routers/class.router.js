const express = require('express')
const router = express.Router()
const classController =  require("../controllers/class.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")
//
var multer = require('multer')
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post('/:class_name/add_a_student', classController.addStudent);
router.post('/:class_name/delete_student/:student_id', classController.deleteStudent);
router.get('/:class_name/modify_student/:student_id', classController.getInfoStudent);
router.post('/:class_name/modify_student/:student_id', classController.modifyStudent);
router.get('/:class_name/import',classController.importStudentRender);
router.post('/:class_name/import', upload.fields([{name: "danhsachhocsinh"}]),classController.importStudentHandle);
router.get('/:class_name/course/:course_name',classController.loadCourseDetailPage);
router.get('/:class_name/course',classController.loadCourseListPage);
router.get('/:class_name',classController.loadStudentListPage);
router.get('/',classController.loadPage);
router.get('/:class_name/export',classController.downloadStudentsOfClass_CSV);
router.get('/:class_name/course/:course_name/download-transcript', classController.downloadTranscriptOfSubject_CSV);
module.exports = router;