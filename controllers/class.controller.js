const Model = require("../models/data.model")
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const DataHelper = require('../helper/Helper');
const students = require('../models/student.model')

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

    async exportStudentCSV(req, res) {
        const data = await students.getListStudentInClass("12A1","")

        // Convert the data to CSV format
        const csv = DataHelper.convertToCsv(data);

        // Set the response headers
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="studentList.csv"');

        // Send the CSV data to the client
        res.send(csv);
    }


}


module.exports = new ClassPageController;