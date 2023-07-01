const student = require('../models/student.model')
const Model = require("../models/year.model")

class ClassPageController{
    async loadPage(req,res){
        let list_year = await Model.getYears();
        let year_str = req.query.year;
        let sem_str = req.query.semester;
        let mssv = "checked";
        let name = undefined;
        let value_search = "";
        res.render('search/searchStudent', { Years: list_year,mssv,name,value_search, CurYear: year_str, CurSem: sem_str });
    }

    async loadSearchResultStudent(req,res){
        const {type_search , search_input} = req.body;
        const year = req.query.year;
        let list_year = await Model.getYears();
        let searchResult = [];

        let mssv = undefined;
        let name = undefined;
        let value_search = undefined;
        value_search = search_input.trim();
        if(type_search === "id"){
            mssv = "checked";
            searchResult = await student.getInfoStudentById_Search(search_input.trim(), year);
        }
        else if(type_search === "name"){
            name = "checked";
            searchResult = await student.getInfoStudentByName_Search(search_input.trim(), year);
        }
        let i = 1;
        searchResult.forEach(element => {
            element.stt = i;
            i = i + 1;
        });

        let message = undefined;
        if(searchResult.length <= 0){
            message = "Không tìm thấy học sinh";
        }
        
        res.render('search/searchStudent',{students:searchResult, mssv, name, value_search ,Years: list_year,CurYear: year, message});
    }
}

module.exports = new ClassPageController;