var conn = require('./connect.model').conn


module.exports = {
    getInfoOfSubject: async(idSubject, idClass) => {
        try {

        } catch (error) {
            
        }
    },

    getTranscriptOfSubject: async(idSubject, idClass) => {
        try {
            let query_string = `SELECT * FROM SUBJECT sj, EXAM ex, EXAMRESULT er, STUDENT st'
                            + 'WHERE sj.ID = ex.SubjectID AND er.ExamID = ex.ID'
                            + 'AND er.StudentID = st.ID'
                            + 'AND ex.ClassID = '${idClass}' AND sj.ID = '${idSubject}'`;
            let result = (await conn).query(query_string);
            return (await result);
        } catch (error) {
            
        }
    },

    getAllSubjectInYear: async(_year) => {
        try {
            var query_string = `SELECT * FROM SUBJECT WHERE _year = '${_year}'`;
            let result = (await conn).query(query_string);
            return (await result).recordset;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    getSubjectWithNameInYear: async(name, _year) => {
        try {
            var query_string = `SELECT * FROM SUBJECT WHERE name ='${name}' and _year = '${_year}'`;
            let result = (await conn).query(query_string);
            return (await result).recordset[0];
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}