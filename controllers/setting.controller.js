const yearModel = require("../models/year.model")
const courseModel = require("../models/subject.model")
const classModel = require("../models/class.model")
const reguModel = require("../models/regulation.model")
const regulations = require("../models/regulation.model")
const util = require("./../models/util.model")
const subjectModel = require("../models/subject.model")

class SettingPageController {

    async loadPage(req, res) {
        let year_str = req.query.year;
        let sem_str = req.query.semester;
        let list_year = await yearModel.getYears();
        let regulation = await regulations.getRegulation(year_str);

        res.render('setting/setting', { regulation, Years: list_year, CurYear: year_str, CurSem: sem_str });
    }

    async getRules(req, res) {
        let year_str = req.query.year;
        let regulation = await regulations.getRegulation(year_str);

        res.setHeader('Content-Type', 'application/json');
        res.json(regulation);
    }

    async handlePostChangeRules(req, res) {
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
        const regulation = req.body;

        let start_year = regulation.start_year;
        let end_year = parseInt(start_year) + 1;

        let cur_year = req.query.year
        let cur_sem = req.query.semester

        var year_str = "" + start_year + "-" + end_year

        console.log(cur_year, cur_sem)
        var mess = ""

        //add Year
        try {
            await yearModel.addYear(start_year, end_year)
            mess += "Thêm năm học thành công.\n";
        }
        catch (e) {
            mess += "Thêm năm học thất bại.\n";
        }

        //add Semester
        try {
            await yearModel.addSemester(start_year, end_year)
            mess += "Thêm kỳ học thành công.\n";
        }
        catch (e) {
            mess += "Thêm kỳ học thất bại.\n";
        }

        //add Class
        try {
            let classes_10 = regulation.name_class_10.split(", ")
            for (let i = 0; i < classes_10.length; i++) {
                await classModel.addClass(year_str, 10, classes_10[i], "")
            }

            let classes_11 = regulation.name_class_11.split(", ")
            for (let i = 0; i < classes_11.length; i++) {
                await classModel.addClass(year_str, 11, classes_11[i], "")
            }

            let classes_12 = regulation.name_class_12.split(", ")
            for (let i = 0; i < classes_12.length; i++) {
                await classModel.addClass(year_str, 12, classes_12[i], "")
            }

            mess += "Thêm lớp học thành công.\n";
        }
        catch (e) {
            mess += "Thêm lớp học thất bại.\n";
        }

        //add Course
        try {
            let courses = regulation.name_of_subject.split(", ")
            for (let i = 0; i < courses.length; i++) {
                await subjectModel.addNewSubject(courses[i], year_str)
            }
            mess += "Thêm môn học thành công.\n";
        }
        catch (e) {
            mess += "Thêm môn học thất bại.\n";
        }

        //add Regulation
        try {
            await reguModel.addRegulation(regulation)
            mess += "Thêm quy định thành công.\n";
        }
        catch (e) {
            mess += "Thêm quy định thất bại.\n";
        }

        req.flash('message', mess);

        res.redirect(`/class?year=${year_str}&semester=1`)
    }
}

module.exports = new SettingPageController;