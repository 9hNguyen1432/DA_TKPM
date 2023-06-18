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
    }
}