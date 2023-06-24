const express = require('express')
const router = express.Router()
const summaryController =  require("../controllers/summary.controller");
const {isNotAuthenticated} = require("..//middlewares/auth");

router.get('/',isNotAuthenticated,summaryController.loadPage)
module.exports = router;