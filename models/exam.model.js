var conn = require('./connect.model').conn

exports.addAnExam = async (name, subject_id, class_id, semester, year) => {
    try {
        const pool = await conn;
        const query_string = `
          INSERT INTO EXAM(name, subject_id, class_id, _semester, _year)
          OUTPUT INSERTED.id
          VALUES (N'${name}', '${subject_id}', '${class_id}', '${semester}', '${year}')
        `;
        console.log(query_string);
        const result = await pool.request().query(query_string);
        const insertedId = result.recordset[0].id;
        console.log('Inserted ID:', insertedId);
        return insertedId;
    } catch (err) {
        console.error('Lỗi truy vấn:', err);
    }
}

exports.getExam = async (name, subject_id, class_id, semester, year) => {
    try {
        var query_string = `SELECT * FROM EXAM WHERE name = N'${name}' and
            subject_id = '${subject_id}' and
            class_id= '${class_id}' and
            _semester= '${semester}' and
            _year= '${year}'`
        console.log(query_string)
        let result = (await conn).query(query_string);
        return (await result).recordset[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

exports.getAnExamResult = async (exam_id, student_id) => {
    try {
        var query_string = `SELECT * FROM EXAM_RESULT WHERE exam_id = N'${exam_id}' and
        student_id = '${student_id}'`
        console.log(query_string)
        let result = (await conn).query(query_string);
        return (await result).recordset[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}
exports.addAnExamResult = async (exam_id, student_id, score) => {
    const pool = await conn;
    try {
        if (await this.getAnExamResult(exam_id, student_id)) {
            let query_string = `delete from EXAM_RESULT where exam_id = N'${exam_id}' and
            student_id = '${student_id}'`
            console.log(query_string)
            await pool.request().query(query_string);
        }

        let query_string = `insert into EXAM_RESULT (exam_id, student_id, mark)
            values('${exam_id}','${student_id}','${score}')`
        console.log(query_string)
        return await pool.request().query(query_string);
    } catch (err) {
        console.error(err)
    }
}