class LoginPageController{
    async loadPage(req,res){
        res.render('login_page',{header: 'none'});
    }
}

module.exports = new LoginPageController;