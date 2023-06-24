const Model = require("../models/year.model")
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const multer = require('multer');
const DataHelper = require('../helper/Helper');
const student = require('../models/student.model');
const Class = require('../models/class.model');
const subject = require('../models/subject.model')
const mo = require("../models/class.model")
const url = require('url');
const regulation = require('../models/regulation.model');
const account = require('../models/account');

const ClassModel = require("../models/class.model")
const AccModel = require('../models/account')
var crypto = require('crypto')

class ClassPageController {

    async loadPage(req, res) {
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester

        // get class name
        let allClass = await mo.getAllClassInYear(year_str);
        let allClassName = allClass.map(_class => _class.name);

        let className = {
            class10: allClassName.filter(name => name.slice(0, 2) === "10"),
            class11: allClassName.filter(name => name.slice(0, 2) === "11"),
            class12: allClassName.filter(name => name.slice(0, 2) === "12"),
        }

        const message = req.flash('message')[0];

        res.render('class/home', { Years: list_year, className, CurYear: year_str, CurSem: sem_str, message });
    }

    async loadStudentListPage(req, res) {
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester
        let class_name = req.params.class_name;

        const amountStudent = await Class.getClass(class_name, year_str).amount_student;
        var listStudent = await student.getListStudentInClass_2(class_name, year_str);
        listStudent.forEach((student, index) => {
            student.stt = index + 1;
            student.name = student.name[0];
            student.id = student.id[0];

            var date = new Date(student.dob.toString());
            var day = date.getDate();
            var month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
            var year = date.getFullYear();
            day = (day < 10) ? "0" + day : day;
            month = (month < 10) ? "0" + month : month;

            student.dob = day + "/" + month + "/" + year;
        })

        const message = await req.flash('message');

        res.render('class/students', {
            ClassName: class_name,
            Teacher: "Lê Thị Ngọc Bích",
            class: amountStudent,
            listStudent: listStudent,
            Years: list_year,
            CurYear: year_str,
            CurSem: sem_str,
            message: message
        });
    }

    async loadCourseListPage(req, res) {
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester

        let class_name = req.params.class_name;
        res.render('class/courses',
            {
                ClassName: class_name,
                Teacher: "Lê Thị Ngọc Bích",
                StudentNumber: 100,
                Years: list_year,
                CurYear: year_str,
                CurSem: sem_str
            });
    }

    async loadCourseDetailPage(req, res) {
        let class_name = req.params.class_name;
        let course_name = req.params.course_name;

        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester

        res.render('class/courses_detail',
            {
                ClassName: class_name,
                Teacher: "Lê Thị Ngọc Bích",
                StudentNumber: 100,
                CourseName: course_name,
                Years: list_year,
                CurYear: year_str,
                CurSem: sem_str
            });
    }

    async downloadStudentsOfClass_CSV(req, res) {
        const data = await student.getListStudentInClass_2("12A1", "2021-2022")

        // Convert the data to CSV format
        const csv = DataHelper.convertToCsv(data);

        // Set the response headers
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"; filename*=UTF-8''${encodeURIComponent(filename)}`);

        // Send the CSV data to the client
        res.send(csv);
    }

    async downloadTranscriptOfSubject_CSV(req, res) {
        const data = await subject.getTranscriptOfSubject("Toan", "10A1");

        // Convert the data to CSV format
        const csv = DataHelper.convertToCsv(data);

        // Set the response headers
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"; filename*=UTF-8''${encodeURIComponent(filename)}`);

        // Send the CSV data to the client
        res.send(csv);
    }

    async getInfoStudent(req, res) {
        const className = req.params.class_name;
        const studentId = req.params.student_id;
        const year = req.query.year;

        const studentData = await student.getAStudent(studentId);

        res.send(studentData);
    }

    async addStudent(req, res) {
        //add student here
        let studentData = req.body;
        let className = req.params.class_name;
        let year = req.query.year;
        let semester = req.query.semester;

        let classinfo = await mo.getClass(className, year);
        let maxID = await student.getMaxID();
        var rule = await regulation.getRegulation(year);

        let amountStudent = classinfo.amount_student;
        if (amountStudent >= rule.max_student) {
            // TODO: so hoc sinh vuot qua quy dinh
            req.flash('message', `Số học sinh đã là tối đa (${rule.max_student}).`);
            res.redirect(`/class/${className}?year=${year}&semester=${semester}`);
        }
        let curId = maxID + 1;
        studentData.id = curId;
        studentData.class_id = classinfo.id;
        if (studentData.gender == 'male') {
            studentData.gender = "Nam";
        }
        else {
            studentData.gender = "Nữ";
        }
        await student.addAStudent(studentData);

        req.flash('message', `Thêm học sinh thành công.`);
        res.redirect(`/class/${className}?year=${year}&semester=${semester}`);
    }

    async modifyStudent(req, res) {
        let studentData = req.body;
        if (studentData.gender == 'male') {
            studentData.gender = "Nam";
        }
        else {
            studentData.gender = "Nữ";
        }
        let studentId = req.params.student_id;
        let className = req.params.class_name;
        let year = req.query.year;
        let semester = req.query.semester;

        await student.modifyStudentInClassByID(studentId, studentData);

        res.redirect(`/class/${className}?year=${year}&semester=${semester}`);
    }

    async deleteStudent(req, res) {
        let studentId = req.params.student_id;
        let className = req.params.class_name;
        let { admin_password } = req.body;
        const user = req.session.user;
        const year = req.query.year;
        const semester = req.query.semester;

        const isRightPassword = await account.checkPassword(user.username, admin_password);

        if (isRightPassword) {
            let result = await student.deleteStudentByID(studentId);
        }
        else {
            req.flash('message', `Mật khẩu không đúng.`);
        }
        res.redirect(`/class/${className}?year=${year}&semester=${semester}`);
    }

    //for method get(/:class_name/import)
    async importStudentRender(req, res) {
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester

        var user = req.session.user;

        let { class_name } = req.params;

        //get current class
        let allClass = await mo.getAllClassInYear(year_str);
        let allClassName = allClass.map(_class => _class.name);
        //
        res.render('class/import_students', {
            user,
            allClassName,
            class_name,
            Years: list_year,
            CurYear: year_str,
            CurSem: sem_str
        });
    }

    //for method post(/:class_name/import)
    async importStudentHandle(req, res, next) {
        var user = req.session.user
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester

        //TODO get current class

        let allClass = await mo.getAllClassInYear(year_str);
        let allClassName = allClass.map(_class => _class.name);
        var classChoosen = req.body.class.trim();
        try {
            // TODO: load rule from database

            var rule = await regulation.getRegulation(year_str);
            //

            var teacher = req.body.gvcn;
            let classInfo = await mo.getClass(classChoosen, year_str);
            let amountStudent = classInfo.amount_student;
            //
            var csvFileStudent = await mo.CSVFiletoJsonObject(req.files.danhsachhocsinh[0].buffer.toString('utf8'), ['stt', 'name', 'gender', 'DOB', 'address'])
            var validedData = await mo.checkListStudent(csvFileStudent, amountStudent, year_str);
            var errors = [];
            var success = false
            if (validedData.constrainNumOfStudents === false) {
                errors.push("Số học sinh của lớp không hợp lệ (tối đa " + rule.max_student + ")");
                if (validedData.listStudentInvalid.length != 0) {
                    for (let Student of validedData.listStudentInvalid) {
                        errors.push("Thông tin học sinh " + Student.name + " Không hợp lệ. (Lưu ý: Ngày sinh: mm/dd/yyyy)");
                    }
                }
                res.render('class/import_students', {
                    user,
                    errors,
                    allClassName,
                    class_name: classChoosen,
                    Years: list_year,
                    CurYear: year_str,
                    CurSem: sem_str
                })
            }

            else {
                if (validedData.listStudentInvalid.length != 0) {
                    for (let Student of validedData.listStudentInvalid) {
                        errors.push("Thông tin học sinh " + Student.name + " Không hợp lệ. (Lưu ý: Ngày sinh: mm/dd/yyyy)");
                    }
                    res.render('class/import_students', {
                        user,
                        errors,
                        allClassName,
                        class_name: classChoosen,
                        Years: list_year,
                        CurYear: year_str,
                        CurSem: sem_str
                    })
                    return;
                }
                success = true
                //TODO save in database
                var listStudent = validedData.listStudentValid
                var id = await student.getTheNewestStudentID(classChoosen, year_str);
                await student.addListStudent(listStudent, id, classInfo);
                res.render('class/import_students', {
                    user,
                    errors,
                    allClassName,
                    class_name: classChoosen,
                    Years: list_year,
                    CurYear: year_str,
                    CurSem: sem_str,
                    success
                })
            }

        }
        catch (err) {
            console.log(err)
            res.render('class/import_students', {
                user, errors, allClassName,
                class_name: classChoosen,
                Years: list_year,
                CurYear: year_str,
                CurSem: sem_str,
            })

        }

    }
    async getListStudentData(req, res) {
        let params = req.params;
        let class_name = params.class_name;
        let year_str = req.query.year;
        var listStudent = await student.getListStudentInClass_2(class_name, year_str);
        let listStudentWithIdAndName = listStudent.map(e => { return { id: e.id[0], fullName: e.name[0] } });
        res.send(listStudentWithIdAndName);
    }

    async importScoreRender(req, res) {
        var user = req.session.user
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester

        let params = req.params;
        let class_name = params.class_name;



        console.log(params);
        //get current class
        let allClass = await mo.getAllClassInYear(year_str);
        let allClassName = allClass.map(_class => _class.name);
        console.log(allClassName);
        var listStudent = await student.getListStudentInClass_2(class_name, year_str);
        let listStudentWithIdAndName = listStudent.map(e => { return { id: e.id[0], fullName: e.name[0] } });

        let allSubject = await subject.getAllSubjectInYear(year_str);
        let allSubjectName = allSubject.map(e => e.name);




        res.render('class/import_score', {
            user,
            allClassName,
            class_name: params.class_name,
            allSubjectName,
            subject_name: params.course_name,
            Years: list_year,
            CurYear: year_str,
            CurSem: sem_str,
            listStudent: listStudentWithIdAndName
        })

    }
    async importScoreHandle(req, res) {

        var user = req.session.user
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester

        let params = req.params;
        let class_name = req.body.class.trim();
        let subject_name = req.body.subject.trim();

        let allClass = await mo.getAllClassInYear(year_str);
        let allClassName = allClass.map(_class => _class.name);
        let allSubject = await subject.getAllSubjectInYear(year_str);
        let allSubjectName = allSubject.map(e => e.name);

        let classInfo = await mo.getClass(class_name, year_str);
        let subjectInfo = await subject.getSubjectWithNameInYear(subject_name, year_str);

        try {
            //
            var csvFileScore = await mo.CSVFiletoJsonObject(req.files.importscore[0].buffer.toString('utf8'), ['id', 'name', 'muoilam', 'mottiet', 'hocky']);
            //TODO save in database
            await mo.saveListScore(csvFileScore, classInfo, subjectInfo, sem_str.trim(), year_str.trim());

            var success = true
            res.render('class/import_score', {
                user,
                allClassName,
                class_name: params.class_name,
                allSubjectName,
                subject_name: params.course_name,
                Years: list_year,
                CurYear: year_str,
                CurSem: sem_str,
                success
            })


        }
        catch (err) {
            console.log(err)
            res.render('class/home')

        }

    }
    async addClass(req, res) {
        let grade = req.body.grade;
        let class_name = req.body.class_name.toUpperCase();
        let teacher = req.body.teacher
        let year = req.query.year

        try {
            await ClassModel.addClass(year, grade, class_name, teacher);
            req.flash('message', `Thành công: Đã thêm lớp ${class_name}`);
        } catch (e) {
            console.log(e.message);
            req.flash('message', `Thất bại: ${class_name} tên lớp học bị trùng.`);
        }

        //reload
        res.redirect(req.get('referer'));
    }

    async deleteClass(req, res) {
        let password = req.body.password;

        let class_name = req.query.class;
        let year = req.query.year
        let sem = req.query.semester

        //check password
        let accPass = req.session.user.password
        var crypto_pass = crypto.createHash('md5').update(password).digest('hex');
        if (crypto_pass.toUpperCase() == accPass) {
            try {
                await ClassModel.deleteClass(year, class_name);
                req.flash('message', `Thành công: Đã xóa lớp ${class_name}`);
                res.redirect(`/class?year=${year}&semester=${sem}`)
            } catch (e) {
                console.log(e.message);
                req.flash('message', `Thất bại: Không thể xóa lớp ${class_name} vì đã có thông tin về học sinh, môn học ...`);
                //reload
                res.redirect(req.get('referer'));
            }
        } else {
            req.flash('message', 'Thất bại: Mật khẩu không đúng.');
            //reload
            res.redirect(req.get('referer'));
        }
    }
}

module.exports = new ClassPageController;