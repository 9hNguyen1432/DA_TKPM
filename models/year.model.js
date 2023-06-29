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
    addYear: async (start_year, end_year) => {
        try {
            var query_string = `INSERT INTO YEAR VALUES('${start_year}-${end_year}')`;
            let result = (await conn).query(query_string)
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    addSemester: async (start_year, end_year) => {
        let year_str = ""+start_year+"-"+end_year
        try {
            var query_string = `INSERT INTO SEMESTER VALUES(1,'${year_str}')
                                INSERT INTO SEMESTER VALUES(2,'${year_str}')`;
            let result = (await conn).query(query_string)
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

