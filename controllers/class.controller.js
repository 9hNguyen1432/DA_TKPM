const Model = require("../models/data.model")

class ClassPageController{
    async loadPage(req,res){
        let list_year = await Model.getYears();
        console.log(list_year)
        res.render('class/home',{Years: list_year});
    }

    async loadStudentListPage(req,res){
        let class_name = req.params.class_name;
        res.render('class/students',{ClassName: class_name, Teacher: "Lê Thị Ngọc Bích", StudentNumber: 100});
    }

    async loadCourseListPage(req,res){
        let class_name = req.params.class_name;
        res.render('class/courses',{ClassName: class_name, Teacher: "Lê Thị Ngọc Bích", StudentNumber: 100});
    }

    async loadCourseDetailPage(req,res){
        let class_name = req.params.class_name;
        let course_name = req.params.course_name;
        res.render('class/courses_detail',{ClassName: class_name, Teacher: "Lê Thị Ngọc Bích", StudentNumber: 100, CourseName: course_name});
    }
}

module.exports = new ClassPageController;