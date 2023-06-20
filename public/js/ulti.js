module.exports = {
    getCurYearSem: function () {
        var date = new Date();
        var year = parseInt(date.getFullYear());
        var month = parseInt(date.getMonth());
        var semester = 1;
        if (month < 9) {
            year = year - 1;
            semester = 2;
        }
        return [semester,year];
    }
}