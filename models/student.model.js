var conn = require('./connect.model').conn
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
        getListStudentInClass_2: async (className, year) => {
            try {
                let query_string = `SELECT * FROM STUDENT st, CLASS cl WHERE st.class_id = cl.ID AND cl.Name = '${className}' AND cl._year = '${year}'`;
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
                                SET name = N'${studentData.student_name}', gender = N'${studentData.gender}', dob = '${studentData.dob}',
                                email = '${studentData.email}', address = N'${studentData.address}' 
                                WHERE id = '${idStudent}'`;
            let result = (await conn).query(query_string);
            return result;
        },

        deleteStudentByID: async(idStudent) => {
            let query_string = `DELETE FROM STUDENT WHERE id = '${idStudent}'`;
            let result = (await conn).query(query_string);
            return result;
        },

        getMaxID: async()=>{
            let query_string = `SELECT MAX(CAST(id AS INT)) AS max_id FROM STUDENT;`
            let result = (await conn).query(query_string);
            if(result !== undefined){
                return (await result).recordset[0].max_id;
            }
            return -1;
        }
    }