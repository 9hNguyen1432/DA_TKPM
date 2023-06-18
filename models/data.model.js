var conn = require('./connect.model').conn

module.exports = {
    getYears: async () => {
        try {
            var query_string = `SELECT * FROM YEAR`;
            let result = (await conn).query(query_string)
            console.log(result)
            return (await result).recordsets[0];
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    addYear: async (_id, _yearname) => {
        try {
            var query_string = `INSERT INTO YEAR VALUES(${_id},'${_yearname}')`;
            let result = (await conn).query(query_string)
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

