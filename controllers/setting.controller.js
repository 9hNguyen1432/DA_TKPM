const Model = require("../models/year.model")

class SettingPageController {

    async loadPage(req, res) {
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester
        res.render('setting/setting', { Years: list_year, CurYear: year_str, CurSem: sem_str});
    }

    async addYear(req, res) {
        let start_year = req.body.start_year;
        let end_year = parseInt(start_year) + 1;

        await Model.addYear(start_year,end_year)

        res.redirect('/')
    }
}

module.exports = new SettingPageController;