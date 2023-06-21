const express = require('express')
const router = express.Router()
const settingController =  require("../controllers/setting.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")

router.get('/edit',isNotAuthenticated, settingController.loadPage)
router.post('/edit',isNotAuthenticated, settingController.handlePostChangeRules)


router.post('/add_year', settingController.addYear)

module.exports = router;