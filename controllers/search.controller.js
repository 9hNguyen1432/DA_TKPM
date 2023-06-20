const Model = require("../models/year.model")

class ClassPageController{
    async loadPage(req,res){
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester
        res.render('search/searchStudent', { Years: list_year, CurYear: year_str, CurSem: sem_str });
    }

    async loadSearchResultStudent(req,res){
        let searchResult = [];
        res.render('search/searchStudent',{students:searchResult});
    }
}

module.exports = new ClassPageController;