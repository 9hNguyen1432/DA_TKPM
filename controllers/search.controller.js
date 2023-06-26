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
        const year = req.query.year;
        let searchResult;
        console.log("SEACH: " + type_search + "  " + search_input);
        if(type_search === "id"){
            searchResult = student.getInfoStudentById_Search(search_input, year);
        }
        else if(type_search === "name"){
            searchResult = student.getInfoStudentByName_Search(search_input, year);
        }
        
        res.render('search/searchStudent',{students:searchResult});
    }
}

module.exports = new ClassPageController;