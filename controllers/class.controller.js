const Model = require("../models/data.model");
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const multer = require('multer');
const DataHelper = require('../helper/Helper');
const student = require('../models/student.model');
const subject = require('../models/subject.model')
const mo = require("../models/class.model")

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

    //for method get(/:class_name/import)
    async importStudentRender(req, res) {
        let class_name = req.params.class_name;
        let course_name = req.params.course_name;
        res.render('class/import_students');
    }
    //for method post(/:class_name/import)
    async importStudentHandle(req, res, next) {
        // console.log(req.files)
        //TODO: get user
        // var user = req.session.user
        var user = "Chinh";
        //
        

        try {
            // TODO: load rule from database
            var rule = {
                minAge: 15,
                maxAge: 20,
                maxStudents: 40
            }
            //
            console.log(req.body)
            var csvFileStudent = await mo.CSVFiletoJsonObject(req.files.danhsachhocsinh[0].buffer.toString('utf8'))
            var validedData = await mo.checkListStudent(csvFileStudent);
            var errors = [];
            console.log(validedData)
            var classChoosen = req.body.class;
            var teacher = req.body.gvcn;
            var success = false
            if (validedData.constrainNumOfStudents == false) {
                errors.push("Số học sinh của lớp không hợp lệ (tối đa " + rule.maxStudents + ")");
                if (validedData.listStudentInvalid.length != 0) {
                    for (let Student of validedData.listStudentInvalid) {
                        errors.push("Thông tin học sinh " + Student.ten + " Không hợp lệ.");
                    }
                    res.render('class/import_students', { user, errors })
                }
            }

            else {
                if (validedData.listStudentInvalid.length != 0) {
                    for (let Student of validedData.listStudentInvalid) {
                        errors.push("Thông tin cầu thủ " + Student.ten + " Không hợp lệ.");
                    }
                    res.render('class/import_students', { user, errors })
                    return;
                }
                success = true
                //TODO save in database
                var listStudent = validedData.listStudentValid


                res.render('class/import_students', { user, errors })
            }

        }
        catch (err) {
            console.log(err)
            res.render('class/import_students', { user, errors })

        }

    }
}


module.exports = new ClassPageController;