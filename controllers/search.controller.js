class ClassPageController{
    async loadPage(req,res){
        res.render('search/searchStudent');
    }

    async loadSearchResultStudent(req,res){
        let searchResult = [];
        res.render('search/searchStudent',{students:searchResult});
    }
}

module.exports = new ClassPageController;