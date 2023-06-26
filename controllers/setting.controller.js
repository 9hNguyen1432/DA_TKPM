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

        let list_year = await yearModel.getYears();
        let temp = await regulations.addRegulation(regulation);
        res.render('setting/setting', {regulation, Years: list_year, CurYear: year_str, CurSem: sem_str });
    }

    async addYear(req, res) {
        let start_year = req.body.start_year;
        let end_year = parseInt(start_year) + 1;

        let cur_year = req.query.year
        let cur_sem = req.query.semester

        console.log(cur_year,cur_sem)
        var mess = ""
        try {
            await Model.addYear(start_year, end_year)
            req.flash('message', 'Action Successful.');
        }
        catch (e) {
            req.flash('message', 'Action Failed !!!');
        }

        await yearModel.addYear(start_year,end_year)

        res.redirect(`/`)
    }
}

module.exports = new SettingPageController;