var conn = require('./connect.model').conn


module.exports = {
    getInfoOfSubject: async(idSubject, idClass) => {
        try {

        } catch (error) {
            
        }
    },

    getTranscriptOfSubject: async(subjectName, className, year, semester) => {
        try {
            //TODO: 
            let query_string = `SELECT 
                                        S.name AS Name,
                                        ISNULL(ER_15.mark, 0) AS mark_15,
                                        ISNULL(ER_1.mark, 0) AS mark_1,
                                        ISNULL(ER_semester.mark, 0) AS mark_semester
                                FROM STUDENT AS S
                                JOIN CLASS AS C ON S.class_id = C.id
                                LEFT JOIN EXAM_RESULT AS ER_15 ON ER_15.student_id = S.id
                                LEFT JOIN EXAM_RESULT AS ER_1 ON ER_1.student_id = S.id
                                LEFT JOIN EXAM_RESULT AS ER_semester ON ER_semester.student_id = S.id
                                LEFT JOIN EXAM AS E_15 ON E_15.id = ER_15.exam_id AND E_15.name = '15 phút'
                                LEFT JOIN EXAM AS E_1 ON E_1.id = ER_1.exam_id AND E_1.name = '1 tiết'
                                LEFT JOIN EXAM AS E_semester ON E_semester.id = ER_semester.exam_id AND E_semester.name = 'học kì'
                                LEFT JOIN SUBJECT AS SJ ON SJ.id = E_15.subject_id AND SJ.name = 'Tên môn học'
                                WHERE
                                    C.name = '${className}' AND
                                    C._year = '${year}' AND
                                    E_15._year = '${year}' AND
                                    E_15._semester = '${semester}' AND
                                    E_1._year = '${year}' AND
                                    E_1._semester = '${semester}' AND
                                    E_semester._year = '${year}' AND
                                    E_semester._semester = '${semester}'`;
            let result = (await conn).query(query_string);
            return (await result).recordset;
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
            var query_string = `SELECT * FROM SUBJECT WHERE name = N'${name}' and _year = '${_year}'`;
            let result = (await conn).query(query_string);
            return (await result).recordset[0];
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}