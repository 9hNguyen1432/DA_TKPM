class SettingPageController{
    async loadPage(req,res){
        res.render('setting/setting');
    }
}

module.exports = new SettingPageController;