const express = require('express')
const router = express.Router()
const settingController =  require("../controllers/setting.controller");
const {isNotAuthenticated} = require("..//middlewares/auth")

router.get('/edit',isNotAuthenticated, settingController.loadPage)
router.post('/edit',isNotAuthenticated, settingController.handlePostChangeRules)

router.get('/data', settingController.getRules)


router.post('/add_year',isNotAuthenticated, settingController.addYear)
router.get('/newyear',isNotAuthenticated, settingController.loadRegulation);
router.get('/all_year',isNotAuthenticated, settingController.getAllYear);

module.exports = router;