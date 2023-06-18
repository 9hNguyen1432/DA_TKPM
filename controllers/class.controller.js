const Model = require("../models/data.model");
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const multer = require('multer');
const DataHelper = require('../helper/Helper');
const student = require('../models/student.model');
const Class = require('../models/class.model');
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
        let year = "2021-2022"
        const _class = await Class.getClass(class_name,year).amount_student;
        var listStudent = await student.getListStudentInClass_2(class_name, year);
        listStudent.forEach((student,index) => {
            student.stt = index + 1;
            student.name = student.name[0];
            student.id = student.id[0];
           
            var date = new Date(student.dob.toString());
            var day = date.getDate();
            var month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
            var year = date.getFullYear();
            day = (day < 10) ? "0" + day : day;
            month = (month < 10) ? "0" + month : month;

            student.dob  = day + "/" + month + "/" + year;
        })
        res.render('class/students', { ClassName: class_name, Teacher: "Lê Thị Ngọc Bích", class: _class, listStudent: listStudent});
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
        var user = req.session.user;
        //TODO:get year and semester:
        let year = "2021-2022";
        let semester = 1;
        //
        //TODO get current class
        student.getAStudent("2110002");
        //
        let allClass = await mo.getAllClassInYear(year);
        let allClassName = allClass.map(_class => _class.name);
        //
        res.render('class/import_students',  { user, year, semester, allClassName});
    }
    //for method post(/:class_name/import)
    async importStudentHandle(req, res, next) {
        // console.log(req.files)
        var user = req.session.user
        //
        
        let year = "2021-2022";
        let semester = 1;
        //
        //TODO get current class

        //
        let allClass = await mo.getAllClassInYear(year);
        let allClassName = allClass.map(_class => _class.name);
        try {
            // TODO: load rule from database
            var rule = {
                minAge: 15,
                maxAge: 20,
                maxStudents: 40
            }
            //
            var classChoosen = req.body.class.trim();
            console.log(classChoosen)
            var teacher = req.body.gvcn;
            let classInfo = await mo.getClass(classChoosen,"2021-2022");
            let amountStudent = classInfo.amount_student;
            //
            var csvFileStudent = await mo.CSVFiletoJsonObject(req.files.danhsachhocsinh[0].buffer.toString('utf8'))
            var validedData = await mo.checkListStudent(csvFileStudent, amountStudent);
            var errors = [];
            console.log(validedData)

            var success = false
            if (validedData.constrainNumOfStudents == false) {
                errors.push("Số học sinh của lớp không hợp lệ (tối đa " + rule.maxStudents + ")");
                if (validedData.listStudentInvalid.length != 0) {
                    for (let Student of validedData.listStudentInvalid) {
                        errors.push("Thông tin học sinh " + Student.name + " Không hợp lệ. (Lưu ý: Ngày sinh: mm/dd/yyyy)");
                    }
                    res.render('class/import_students', { user, errors, allClassName })
                }
            }

            else {
                if (validedData.listStudentInvalid.length != 0) {
                    for (let Student of validedData.listStudentInvalid) {
                        errors.push("Thông tin học sinh " + Student.name + " Không hợp lệ. (Lưu ý: Ngày sinh: mm/dd/yyyy)");
                    }
                    res.render('class/import_students', { user, errors, allClassName })
                    return;
                }
                success = true
                //TODO save in database
                var listStudent = validedData.listStudentValid
                var id = await student.getTheNewestStuedentID(classChoosen, year);
                await student.addListStudent(listStudent, id, classInfo);

                res.render('class/import_students', { user, errors, allClassName })
            }

        }
        catch (err) {
            console.log(err)
            res.render('class/import_students', { user, errors, allClassName })

        }

    }
}


module.exports = new ClassPageController;