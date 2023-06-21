const yearModel = require("../models/year.model")
const regulations = require("../models/regulation.model")
const util = require("./../models/util.model")

class SettingPageController {

    async loadPage(req, res) {
        let year_str = req.query.year;
        let sem_str = req.query.semester;
        let list_year = await yearModel.getYears();
        let regulation = await regulations.getRegulation(year_str);

        res.render('setting/setting', {regulation, Years: list_year, CurYear: year_str, CurSem: sem_str});
    }

    async handlePostChangeRules(req, res){
        const regulation = req.body;
        let year_str = req.query.year;
        let sem_str = req.query.semester;
        regulation._year = year_str;
        //valid
        var errors = [];
        let isValidClass10 = util.isValidListClass(regulation.num_of_class_10, regulation.name_class_10, '10'); 
        let isValidClass11 = util.isValidListClass(regulation.num_of_class_11, regulation.name_class_11, '11'); 
        let isValidClass12 = util.isValidListClass(regulation.num_of_class_12, regulation.name_class_12, '12'); 

        let list_year = await yearModel.getYears();
        console.log(regulation);
        let temp = await regulations.addRegulation(regulation);

        res.render('setting/setting', {regulation, Years: list_year, CurYear: year_str, CurSem: sem_str});
    }

    async addYear(req, res) {
        let start_year = req.body.start_year;
        let end_year = parseInt(start_year) + 1;

        await yearModel.addYear(start_year,end_year)

        res.redirect('/')
    }
}

module.exports = new SettingPageController;