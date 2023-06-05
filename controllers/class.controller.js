class ClassPageController{
    async loadPage(req,res){
        res.render('class/home');
    }
}

module.exports = new ClassPageController;