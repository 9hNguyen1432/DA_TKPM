const student = require('../models/student.model')
const Model = require("../models/year.model")

class ClassPageController{
    async loadPage(req,res){
        let list_year = await Model.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester
        res.render('search/searchStudent', { Years: list_year, CurYear: year_str, CurSem: sem_str });
    }

    async loadSearchResultStudent(req,res){
        const {type_search , search_input} = req.body;
        let searchResult;

        if(type_search === "mssv"){
            //searchResult = student.getStudentById(search_input);
        }
        else if(type_search === "name"){
           // searchResult = student.getStudentByName(search_input);
        }

        res.render('search/searchStudent',{students:searchResult});
    }
}

module.exports = new ClassPageController;