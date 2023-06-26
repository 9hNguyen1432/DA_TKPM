const Model = require("../models/year.model");
const subject = require("../models/subject.model");

class CoursePageController {
    async loadPage(req, res) {
        let list_year = await Model.getYears();
        let year_str = req.query.year;
        let sem_str = req.query.semester;

        let select_grade = req.params.grade;
        let select_subject = req.params.subject;

        if(select_grade === undefined || select_subject === undefined){
            select_grade = "10";
            select_subject = "Toán";
        }

        let summary = await subject.getSummarySubject()
        let list_course = await subject.getAllSubjectInYear(year_str);
        res.render('course/home', { Years: list_year, CurYear: year_str, CurSem: sem_str, listCourse: list_course });
    }
}

module.exports = new CoursePageController;