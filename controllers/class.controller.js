const Model = require("../models/year.model")
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const DataHelper = require('../helper/Helper');
const student = require('../models/student.model');
const subject = require('../models/subject.model')

class ClassPageController {
    async loadPage(req, res) {
        let list_year = await Model.getYears();
        console.log(list_year)
        res.render('class/home', { Years: list_year });
    }

    async loadStudentListPage(req, res) {
        let class_name = req.params.class_name;
        res.render('class/students', { ClassName: class_name, Teacher: "Lê Thị Ngọc Bích", StudentNumber: 100 });
    }

    async loadCourseListPage(req, res) {
        let class_name = req.params.class_name;
        res.render('class/courses', { ClassName: class_name, Teacher: "Lê Thị Ngọc Bích", StudentNumber: 100 });
    }

    async loadCourseDetailPage(req, res) {
        let class_name = req.params.class_name;
        let course_name = req.params.course_name;
        res.render('class/courses_detail', { ClassName: class_name, Teacher: "Lê Thị Ngọc Bích", StudentNumber: 100, CourseName: course_name });
    }

    async importStudent(req, res) {
        let class_name = req.params.class_name;
        let course_name = req.params.course_name;
        res.render('class/import_students');
    }

    async downloadStudentsOfClass_CSV(req, res) {
        const data = await student.getListStudentInClass("12A1", "2021-2022")

        // Convert the data to CSV format
        const csv = DataHelper.convertToCsv(data);

        // Set the response headers
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"; filename*=UTF-8''${encodeURIComponent(filename)}`);

        // Send the CSV data to the client
        res.send(csv);
    }

    async downloadTranscriptOfSubject_CSV(req,res){
        const data = await subject.getTranscriptOfSubject("Toan", "10A1");

        // Convert the data to CSV format
        const csv = DataHelper.convertToCsv(data);

        // Set the response headers
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"; filename*=UTF-8''${encodeURIComponent(filename)}`);

        // Send the CSV data to the client
        res.send(csv);
    }
}


module.exports = new ClassPageController;