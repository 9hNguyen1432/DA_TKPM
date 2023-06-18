const express = require('express')
const router = express.Router()
const classController =  require("../controllers/class.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")

router.get('/:class_name/import',classController.importStudentRender);
router.post('/:class_name/import',classController.importStudentHandle);
router.get('/:class_name/course/:course_name',classController.loadCourseDetailPage);
router.get('/:class_name/course',classController.loadCourseListPage);
router.get('/:class_name',classController.loadStudentListPage);
router.get('/',classController.loadPage);
router.get('/:class_name/export',classController.downloadStudentsOfClass_CSV);
router.get('/class/:class_name/course/:course_name/download-transcript', classController.downloadTranscriptOfSubject_CSV);

module.exports = router;