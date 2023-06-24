

class SummaryController {
    async loadPage(req,res){
        res.render('summary/summary');
    }
}

module.exports = new SummaryController;
