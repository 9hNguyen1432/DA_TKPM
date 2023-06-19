const Model = require("../models/year.model")

class SettingPageController {

    async loadPage(req, res) {
        res.render('setting/setting');
    }

    async addYear(req, res) {
        let year = req.body.start_year;
        console.log(year);

        await Model.addYear(year)

        res.redirect('/class')
    }
}

module.exports = new SettingPageController;