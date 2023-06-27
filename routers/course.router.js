const express = require('express')
const router = express.Router()
const courseController =  require("../controllers/course.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")

router.get('/:grade/tongket/:subject',isNotAuthenticated,courseController.getDataFetch)
router.get('/',isNotAuthenticated,courseController.loadPage)
module.exports = router;