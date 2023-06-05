const express = require('express')
const router = express.Router()
const classController =  require("../controllers/class.controller");

router.get('/',classController.loadPage)

router.get('/:class_name',classController.loadStudentListPage)

module.exports = router;