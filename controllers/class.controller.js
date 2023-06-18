const Model = require("../models/data.model")
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
            console.log(req)
            var csvFileStudent = await mo.CSVFiletoJsonObject(req.files.danhsachhocsinh[0].buffer.toString('utf8'))
            var validedData = await mo.checkListStudent(csvFileStudent);
            var errors = [];

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