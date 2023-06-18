const express = require('express')
const router = express.Router()
const loginController =  require("../controllers/login.controller");
const {isAuthenticated} = require("..//middlewares/auth")

router.post('/',loginController.logIn)
router.get('/',isAuthenticated,loginController.loadPage)
router.get('/logout',loginController.logOut)

module.exports = router;