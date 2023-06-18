const express = require('express')
const router = express.Router()
const searchController =  require("../controllers/search.controller");
const {isNotAuthenticated} = require("..//middlewares/auth");

router.get('/',isNotAuthenticated,searchController.loadPage)

router.get('/:student_name',isNotAuthenticated,searchController.loadSearchResultStudent)

module.exports = router;