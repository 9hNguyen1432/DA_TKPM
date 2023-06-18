const express = require('express')
const router = express.Router()
const courseController =  require("../controllers/course.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")

router.get('/',isNotAuthenticated,courseController.loadPage)

module.exports = router;