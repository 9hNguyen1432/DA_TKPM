var conn = require('./connect.model').conn


module.exports = {
    getStudentById: async (idStudent) => {
        try {
            let query_string = `SELECT * FROM STUDENT WHERE ID = '${idStudent}'`
            let result = (await conn).query(query_string);
            return (await result);
        } catch (error) {

        }
    },
    getStudentByName: async (studentName) => {
        try {
            let query_string = `SELECT * FROM STUDENT WHERE Name = '${studentName}'`;
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
    },

    addInfoStudent: async(studentDate) => {
        //TODO: Do sth
    }
}