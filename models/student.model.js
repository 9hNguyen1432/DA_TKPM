var conn = require('./connect.model').conn


module.exports = {
    getStudentOfId: async (idStudent) => {
        try {
            let query_string = `SELECT * FROM ACCOUNT WHERE username = '${user}'`
            let result = (await conn).query(query_string);
            return (await result);
        } catch (error) {

        }
    },

    getListStudentInClass: async (className, year) => {
        try {
            let query_string = `SELECT * FROM STUDENT st, CLASS cl'
                            + 'WHERE st.ClassId = cl.ID'
                            + 'AND cl.Name = '${className}' AND cl.Year = '${year}'`;
            let result = (await conn).query(query_string);
            return (await result);
        } catch (error) {
        }
    }
}