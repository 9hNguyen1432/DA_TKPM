var conn = require('./connect.model').conn

addAStudent = async function (student) {
    // try {
    //     let query_string = `insert into STUDENT(id, name, gender, dob, email ,address,class_id)'
    //                     values('${student.id}','${student.name}','${student.gender}','${student.dob}',
    //                     '${student.email}','${student.address}',${student.class_id})`
    //         ;
    //     let result = (await conn).query(query_string);
    //     console.log("save ok")
    //     return (await result);
    // } catch (error) {
    // }
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
        getStudentOfId: async (idStudent) => {
            try {
                let query_string = `SELECT * FROM ACCOUNT WHERE username = '${user}'`
                let result = (await conn).query(query_string);
                return (await result);
            } catch (error) {

            }
        },

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
            console.log(await result);
            return (await result);
        },
        getTheNewestStuedentID: async (_class, year) => {
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
        }
    }