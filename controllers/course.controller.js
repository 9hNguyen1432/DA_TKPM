const Model = require("../models/year.model")

class CoursePageController {
    async loadPage(req, res) {
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester
        res.render('course/home', { Years: list_year, CurYear: year_str, CurSem: sem_str });
    }

    async loadPage(req, res) {
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester
        res.render('course/home', { Years: list_year, CurYear: year_str, CurSem: sem_str });
    }
}

module.exports = new CoursePageController;