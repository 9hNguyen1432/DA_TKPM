var conn = require('./connect.model').conn

async function getAnSubjectResult(student_id, subject_id, _semester, _year) {
    try {
        var query_string = `SELECT * FROM RESULT WHERE student_id = '${student_id}' and
        subject_id = '${subject_id}' and _semester = '${_semester}' and _year = '${_year}'`
        console.log(query_string)
        let result = (await conn).query(query_string);
        return (await result).recordset[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}
module.exports = {
    getAnSubjectResult,
    getInfoOfSubject: async (idSubject, idClass) => {
        try {

        } catch (error) {

        }
    },
    getTranscriptOfSubject: async (subjectName, className, year, semester) => {
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

    getAllSubjectInYear: async (_year) => {
        try {
            var query_string = `SELECT * FROM SUBJECT WHERE _year = '${_year}'`;
            let result = (await conn).query(query_string);
            return (await result).recordset;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    getSubjectWithNameInYear: async (name, _year) => {
        try {
            var query_string = `SELECT * FROM SUBJECT WHERE name = N'${name}' and _year = '${_year}'`;
            let result = (await conn).query(query_string);
            return (await result).recordset[0];
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    addAResultOfSubject: async (student_id, subject_id, _semester, _year, mark) => {
        const pool = await conn;
        try {
            if (await getAnSubjectResult(student_id, subject_id, _semester, _year)) {
                let query_string = `delete from RESULT where student_id = '${student_id}' and
                subject_id = '${subject_id}' and _semester = '${_semester}' and _year = '${_year}'`
                console.log(query_string)
                await pool.request().query(query_string);
            }

            let query_string = `insert into RESULT (student_id, subject_id, _semester, _year, mark)
            values('${student_id}','${subject_id}','${_semester}','${_year}','${mark}')`
            console.log(query_string);
            return await pool.request().query(query_string);
        } catch (err) {
            console.error(err)
        }
    },

    getSubjectTranscriptOfClass: async (_year, _semester, class_name, subject_name) => {
        try {
            var query_string = `SELECT
                                    ID, Name,
                                    [Kiểm tra 15 phút] AS exam_15,
                                    [Kiểm tra 1 tiết] AS exam_45,
                                    [Bài thi học kỳ] AS exam_Sem
                                FROM
                                    (
                                        SELECT
                                            s.id ID, s.name Name, er.mark Mark, e.name ExamName
                                        FROM STUDENT s join EXAM_RESULT er on s.id=er.student_id
                                                join EXAM e on e.id=er.exam_id
                                                join CLASS c on c.id=s.class_id
                                                join SUBJECT sj on sj.id=e.subject_id
                                                where e._year='${_year}'
                                                and e._semester=${_semester}
                                                and c.name='${class_name}'
                                                and sj.name = N'${subject_name}'
                                    ) AS SourceTable
                                PIVOT
                                    (
                                        MAX(Mark)
                                        FOR ExamName IN ([Kiểm tra 15 phút],[Kiểm tra 1 tiết], [Bài thi học kỳ])
                                    ) AS PivotTable;
                                `;
            let result = (await conn).query(query_string);
            console.log("hihi\n"+ result)
            return (await result).recordset;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
}