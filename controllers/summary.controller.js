const YearModel = require("../models/year.model")
const SumModel = require("../models/summary.model")

class SummaryController {
    async loadPage(req,res){
        let list_year = await YearModel.getYears();
        let year_str = req.query.year
        let sem_str = req.query.semester
        let sum_semester = req.query.sum_semester

        let SemesterSummary = await SumModel.getSemeterSummary(year_str,sum_semester)

        // if(sum_semester==3){
        //     sum_semester="Cả năm"
        // }

        res.render('summary/summary', { Years: list_year, CurYear: year_str, CurSem: sem_str, SemesterSummary, sum_semester });
    }
}

module.exports = new SummaryController;
