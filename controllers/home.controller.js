const util = require('../models/util.model');

class HomePageController{
    async home(req,res){
        try{
        let yearSem = await util.getCurYearSem();
        console.log(yearSem);

        return res.redirect(`/class?year=${yearSem[1]}&semester=${yearSem[0]}`)
        }
        catch (err){
            return res.redirect(`/class`);
        }
    }
}

module.exports = new HomePageController;