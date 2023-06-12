const Model = require("../models/data.model")

class SettingPageController {

    async loadPage(req, res) {
        res.render('setting/setting');
    }

    async addYear(req, res) {
        let start_year = req.params.start_year;
        let next_year = start_year + 1;
        let year_name = "" + start_year + " - " + next_year;
        await Model.addYear(start_year,year_name)

        location.reload();
    }
}

module.exports = new SettingPageController;