var conn = require('./connect.model').conn
const { json } = require('express');
var classModel = require('./class.model')

addAStudent = async function (student) {
    conn.then(pool => {
        let query_string = `insert into STUDENT(id, name, gender, dob, email ,address,class_id)
            values('${student.id}',N'${student.name}',N'${student.gender}','${student.dob}',
            '${student.email}',N'${student.address}',${student.class_id})`
        console.log(query_string)
        return pool.request().query(query_string);

    }).then(result => {
        console.log(result.recordset);
    }).catch(err => {
        console.error('Lỗi truy vấn:', err);
    });
},
    module.exports = {
        addAStudent,
        getInfoListStudentInClassToDownload: async (className, year) => {
            try {
                let query_string = `SELECT Student.name AS student_name, Class.name AS class_name,
                                    AVG(CASE WHEN Result._semester = 1 THEN Result.mark ELSE NULL END) AS avg_mark_semester1,
                                    AVG(CASE WHEN Result._semester = 2 THEN Result.mark ELSE NULL END) AS avg_mark_semester2
                                    FROM Student
                                    JOIN Class ON Student.class_id = Class.id
                                    JOIN Result ON Result.student_id = Student.id
                                    WHERE Result._year = '${year}' AND Class.name = '${className}'
                                    GROUP BY Student.id, Student.name, Class.name`
                // let query_string = `SELECT st.id, st.name, st.gender, st.dob, st.email, st.address,
                //                             rs1.mark AS AverageMarkSemester1, rs2.mark AS AverageMarkSemester2
                //                     FROM STUDENT st, RESULT rs1 ,RESULT rs2 , CLASS cl
                //                     WHERE cl.id = st.class_id AND rs1.student_id = st.id AND rs1._semester = 1
                //                             AND rs2.student_id = st.id AND rs2._semester = 2
                //                             AND cl.name = '${className}' AND rs1._year = '${year}' AND rs2._year = '${year}'`;
                let result = (await conn).query(query_string);
                if((await result).recordset.length <= 0){
                    let query_string = `SELECT st.id, st.name, st.gender, st.dob, st.email, st.address
                                        FROM STUDENT st, CLASS cl
                                        WHERE cl.id = st.class_id AND cl._year = '${year} AND cl.name = '${className}`;
                    let result = (await conn).query(query_string);
                    return (await result).recordset;
                }
                return (await result).recordset;
            } catch (error) {
                console.log(error);
            }
        },

        getListStudentInClass_2: async (className, year) => {
            try {
                let query_string = `SELECT * FROM STUDENT st, CLASS cl WHERE st.class_id = cl.id 
                                    AND cl.name = '${className}' 
                                    AND cl._year = '${year}'`;
                let result = (await conn).query(query_string);
                return (await result).recordset;
            } catch (error) {
            }
        },
        getAStudent: async (id) => {
            let query_string = `SELECT * FROM STUDENT
                            WHERE id = '${id}'`;
            let result = (await conn).query(query_string);
            return (await result).recordset[0];
        },
        getTheNewestStudentID: async (_class, year) => {
            try {
                let query_string = `SELECT st.id as id, cl.name as classname FROM STUDENT st, CLASS cl
                            WHERE st.class_id = cl.id AND cl._year = '${year}'`;
                let listStudent = (await (await conn).query(query_string)).recordset.filter(
                    student => _class.slice(0, 3) === student.classname.slice(0, 3)
                );
                console.log(listStudent);
                let prefix = year.slice(2, 4) + ((_class.slice(0, 2) === "10") ? "10" : ((_class.slice(0, 2) === "11") ? "11" : "12"));
                //if empty, use a new id
                console.log(prefix)
                if (!(Array.isArray(listStudent) && listStudent.length)) {
                    return prefix + "000";
                }
                let maxID = Math.max(...(listStudent.map(student => Number(student.id)))) + 1;
                return String(maxID);
            } catch (error) {
            }
        },

        addListStudent: async (listStudent, id, classInfo) => {
            //update amount student of class
            classInfo.amount_student = classInfo.amount_student + listStudent.length;
            await classModel.updateAmountStudent(classInfo.name, classInfo._year, classInfo.amount_student);

            for (let i = 0; i < listStudent.length; i++) {
                id = String(parseInt(id) + 1);
                student = {
                    id: id,
                    name: listStudent[i].name,
                    gender: listStudent[i].gender,
                    dob: listStudent[i].DOB,
                    email: "",
                    address: listStudent[i].address,
                    class_id: classInfo.id
                }
                await addAStudent(student);
            }
        },

        getListStudentInClassByID: async (idStudent, className, year) => {
            try {
                let query_string = `SELECT * FROM STUDENT st, CLASS cl WHERE st.class_id = cl.ID AND cl.Name = '${className}' AND cl._year = '${year}' AND st.id = '${idStudent}'`;
                let result = (await conn).query(query_string);

                return (await result).recordset;
            } catch (error) {
            }
        },

        modifyStudentInClassByID: async (idStudent, studentData) => {
            let query_string = `UPDATE STUDENT 
                                SET name = N'${studentData.name}', gender = N'${studentData.gender}', dob = '${studentData.dob}',
                                email = '${studentData.email}', address = N'${studentData.address}' 
                                WHERE id = '${idStudent}'`;
            let result = (await conn).query(query_string);
            return result;
        },

        deleteStudentByID: async (idStudent) => {
            let query_string = `DELETE FROM STUDENT WHERE id = '${idStudent}'`;
            let result = (await conn).query(query_string);
            return result;
        },

        getInfoStudentById_Search: async (idStudent, year) => {
            // let query_string = `SELECT Student.name AS student_name, Class.name AS class_name,
            //                     AVG(CASE WHEN Result._semester = 1 THEN Result.mark ELSE NULL END) AS avg_mark_semester1,
            //                     AVG(CASE WHEN Result._semester = 2 THEN Result.mark ELSE NULL END) AS avg_mark_semester2
            //                     FROM Student
            //                     JOIN Class ON Student.class_id = Class.id
            //                     JOIN Result ON Result.student_id = Student.id
            //                     WHERE Result._year = '${year}' AND Student.id = '${idStudent}'
            //                     GROUP BY Student.id, Student.name, Class.name`;

            let query_string = `SELECT Student.name AS student_name, Class.name AS class_name,
                                    COALESCE(AVG(CASE WHEN Result._semester = 1 THEN Result.mark ELSE NULL END), 0) AS avg_mark_semester1,
                                    COALESCE(AVG(CASE WHEN Result._semester = 2 THEN Result.mark ELSE NULL END), 0) AS avg_mark_semester2
                                FROM Student
                                JOIN Class ON Student.class_id = Class.id
                                LEFT JOIN Result ON Result.student_id = Student.id AND Result._year = '${year}'
                                WHERE Student.id = '${idStudent}'
                                GROUP BY Student.id, Student.name, Class.name`;

            let result = (await conn).query(query_string);
            return (await result).recordset;
        },

        getInfoStudentByName_Search: async (studentName, year) => {
            const query_string = `SELECT Student.name AS student_name, Class.name AS class_name,
                                    AVG(CASE WHEN Result._semester = 1 THEN Result.mark ELSE NULL END) AS avg_mark_semester1,
                                    AVG(CASE WHEN Result._semester = 2 THEN Result.mark ELSE NULL END) AS avg_mark_semester2
                                    FROM Student
                                    JOIN Class ON Student.class_id = Class.id
                                    JOIN Result ON Result.student_id = Student.id
                                    WHERE Student.name LIKE '%${studentName}%' AND Result._year = '${year}'
                                    GROUP BY Student.id ,Student.name, Class.name`;
            let result = (await conn).query(query_string);
            console.log(result);
            return (await result).recordset;
        },
        getSummaryAllSubjectOfStudent: async(studentID, semester, year) => {
            const queryString =`select SB.name as subject, AVG(ER.mark) as DTB  from EXAM_RESULT ER, EXAM EX, SUBJECT sb  
            WHERE ER.exam_id = EX.id and SB.id = EX.subject_id AND ER.student_id = '${studentID}' AND EX._semester='${semester}' AND EX._year='${year}'
            GROUP BY EX.subject_id, SB.name`


            let result = (await conn).query(queryString);
            return (await result).recordset;
        },
        getSummarySubjectByYearOfStudent:  async(studentID, year) =>{
            const queryString =`select SB.name as subject, AVG(ER.mark) as DTB from EXAM_RESULT ER, EXAM EX, SUBJECT sb  
            WHERE ER.exam_id = EX.id and SB.id = EX.subject_id  and er.student_id= '${studentID}' AND EX._year='${year}'
            GROUP BY EX.subject_id, SB.name`

            let result = (await conn).query(queryString);
            return (await result).recordset;
        } ,
        getSummaryScoreBySemester: async(studentID,year) => {
            const queryString =`select  ex._semester as semester ,AVG(ER.mark) as DTB from EXAM_RESULT ER, EXAM EX, SUBJECT sb  
            WHERE ER.exam_id = EX.id and SB.id = EX.subject_id AND ER.student_id = '${studentID}' AND EX._year='${year}'
            GROUP BY ex._semester`

            let result = (await conn).query(queryString);
            return (await result).recordset;
        },

        getSummaryScoreByYear: async(studentID,year) => {
        const queryString =`select AVG(ER.mark) as DTB from EXAM_RESULT ER, EXAM EX, SUBJECT sb  
        WHERE ER.exam_id = EX.id and SB.id = EX.subject_id AND ER.student_id = '${studentID}' AND EX._year='${year}'
        GROUP BY ex._year`

        let result = (await conn).query(queryString);
        return (await result).recordset;
        },

        getScoreDetailOfStudent: async(studentID,semester,year) =>{
            const queryString =`SELECT ID, Name,[Kiểm tra 15 phút] AS exam_15,[Kiểm tra 1 tiết] AS exam_45, [Bài thi học kỳ] AS exam_Sem
            FROM(
             SELECT sj.id ID, sj.name Name, er.mark Mark, e.name ExamName
             FROM STUDENT s join EXAM_RESULT er on s.id=er.student_id
                join EXAM e on e.id=er.exam_id
                join CLASS c on c.id=s.class_id
                join SUBJECT sj on sj.id=e.subject_id
                where e._year='${year}'
                and e._semester='${semester}' and
                s.id ='${studentID}'
            ) AS SourceTable
            PIVOT
            (
                MAX(Mark)
                FOR ExamName IN ([Kiểm tra 15 phút],[Kiểm tra 1 tiết], [Bài thi học kỳ])
            ) AS PivotTable;`

            let result = (await conn).query(queryString);
            return (await result).recordset;
        }
    }