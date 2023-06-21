const Model = require("../models/year.model")


class SettingPageController {

    async loadPage(req, res) {
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester
        res.render('setting/setting', { Years: list_year, CurYear: year_str, CurSem: sem_str });
    }

    async addYear(req, res) {
        let start_year = req.body.start_year;
        let end_year = parseInt(start_year) + 1;
        console.log(start_year)

        let cur_year = req.query.year
        let cur_sem = req.query.semester

        var mess = ""
        try {
            await Model.addYear(start_year, end_year)
            req.flash('message', 'Action Successful.');
        }
        catch (e) {
            req.flash('message', 'Action Failed !!!');
        }


        res.redirect(`/`)
    }
}

module.exports = new SettingPageController;