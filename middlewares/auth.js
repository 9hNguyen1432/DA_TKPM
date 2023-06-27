const Ulti = require("../public/js/ulti");
var info = Ulti.getCurYearSem();
var semester = info[0]
var curYear = info[1];

function isAuthenticated (req, res, next) {
    if (req.session.user){
        return res.redirect('/')
    }
    return next();
}
function isNotAuthenticated(req, res, next){
    if(req.session.user){
        return next();
    }
    return res.redirect('/')
}

module.exports = { isAuthenticated,isNotAuthenticated}