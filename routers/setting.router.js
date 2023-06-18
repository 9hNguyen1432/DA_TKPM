const express = require('express')
const router = express.Router()
const settingController =  require("../controllers/setting.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")

router.get('/',isNotAuthenticated, settingController.loadPage)


router.post('/add_year', settingController.addYear)

module.exports = router;