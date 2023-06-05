class CoursePageController{
    async loadPage(req,res){
        res.render('course/home');
    }
}

module.exports = new CoursePageController;