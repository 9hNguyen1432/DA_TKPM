const express = require('express')
const router = express.Router()
const settingController =  require("../controllers/setting.controller");

router.get('/',settingController.loadPage)

module.exports = router;