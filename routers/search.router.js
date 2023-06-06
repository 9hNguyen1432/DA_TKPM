const express = require('express')
const router = express.Router()
const searchController =  require("../controllers/search.controller");

router.get('/',searchController.loadPage)

router.get('/:student_name',searchController.loadSearchResultStudent)

module.exports = router;