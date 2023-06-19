var conn = require('./connect.model').conn

exports.getRegulation = async (year) => {
    try {
        var query_string = `SELECT * FROM PARAMETERS WHERE _year = '${year}'`;
        let result = (await conn).query(query_string);
        return (await result).recordset[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}