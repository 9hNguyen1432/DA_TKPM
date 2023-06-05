class HomePageController{
    async home(req,res){
        res.render('home_page');
    }
}

module.exports = new HomePageController;