class ClassPageController{
    async loadPage(req,res){
        res.render('class/home');
    }

    async loadStudentListPage(req,res){
        let class_name = req.params.class_name;
        res.render('class/students',{ClassName: class_name});
    }
}

module.exports = new ClassPageController;