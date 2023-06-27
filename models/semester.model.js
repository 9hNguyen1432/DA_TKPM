var conn = require('./connect.model').conn

exports.getNewestSemester = async (_year) => {
    try {
        var query_string = `SELECT * FROM SEMESTER WHERE _year = '${_year}'`
        let result = (await conn).query(query_string);
        return (await result).recordset[0].length > 1 ? 2 : 1;
    } catch (error) {
        console.error(error);
        return 1;
    }
}



