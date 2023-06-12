const express = require('express')
const router = express.Router()
const settingController =  require("../controllers/setting.controller");

router.get('/', settingController.loadPage)


router.post('/add_year', settingController.addYear)

module.exports = router;