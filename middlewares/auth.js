function isAuthenticated (req, res, next) {
    if (req.session.user){
        return res.redirect('/home')
    }
    return next();
}

module.exports = { isAuthenticated }