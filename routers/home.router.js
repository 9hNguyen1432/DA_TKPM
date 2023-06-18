const express = require('express')
const router = express.Router()
const homeController =  require("../controllers/home.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")

router.get('/',isNotAuthenticated,homeController.home)

module.exports = router;