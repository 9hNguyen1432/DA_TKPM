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
        let searchResult = [];
        if(type_search === "id"){
            searchResult = await student.getInfoStudentById_Search(search_input.trim(), year);
        }
        else if(type_search === "name"){
            searchResult = await student.getInfoStudentByName_Search(search_input.trim(), year);
        }
        console.log("SEARCH: " + searchResult);
        let i = 1;
        searchResult.forEach(element => {
            element.stt = i;
            i = i + 1;
        });
        
        res.render('search/searchStudent',{students:searchResult});
    }
}

module.exports = new ClassPageController;