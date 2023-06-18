const student = require('../models/student.model')

class ClassPageController{
    async loadPage(req,res){
        res.render('search/searchStudent');
    }

    async loadSearchResultStudent(req,res){
        const {type_search , search_input} = req.body;
        let searchResult;

        if(type_search === "mssv"){
            searchResult = student.getStudentById(search_input);
        }
        else if(type_search === "name"){
            searchResult = student.getStudentByName(search_input);
        }

        res.render('search/searchStudent',{students:searchResult});
    }
}

module.exports = new ClassPageController;