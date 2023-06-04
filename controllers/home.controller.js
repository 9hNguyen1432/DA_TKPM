class HomePageController{
    async index(req,res){
        res.render('home_page');
    }
}

module.exports = new HomePageController;