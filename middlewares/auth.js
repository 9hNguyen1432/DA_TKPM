function isAuthenticated (req, res, next) {
    if (req.session.user){
        return res.redirect('/home')
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