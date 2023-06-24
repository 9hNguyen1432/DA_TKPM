var conn = require('./connect.model').conn


module.exports = {
    getInfoOfSubject: async(idSubject, idClass) => {
        try {

        } catch (error) {
            
        }
    },

    getTranscriptOfSubject: async(subjectName, className, year, semester) => {
        try {
            let query_string = `SELECT *
                                FROM SUBJECT sj, EXAM ex, EXAM_RESULT er, STUDENT st, CLASS cl
                                WHERE sj.id = ex.subject_id AND er.exam_id = ex.id
                                AND er.student_id = st.id
                                AND ex.class_id = cl.id
                                AND cl.name = '${className}' AND sj.name = '${subjectName}'
                                AND sj._year = '${year}' AND ex._semester = '${semester}'`;
            let result = (await conn).query(query_string);
            return (await result).recordset;
        } catch (error) {
            
        }
    }
}