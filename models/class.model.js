const csv = require('csvtojson')
var conn = require('./connect.model').conn
var util = require('./util.model')

exports.checkListStudent = async (listStudent, amountStudent) => {
    // TODO: load rule from database
    var rules = {
        minAge: 15,
        maxAge: 20,
        maxStudents: 40
    }
    //TODO: load number student of Class
    let numStudent= 0;
    // lish hoc sinh hop le (trong khoang tuoi quy dinh)
    var listStudentValid = [];
    //list hoc sinh khong hop le
    var listStudentInvalid = [];
    // dieu kien so hoc sinh
    var constrainNumOfStudents = false;
    for (let Student of listStudent) {
        try {
            let age = util.getAge(Student.DOB);
            let checkValidMonth = util.checkValidMonth(Student.DOB);
            if (util.isBetween(age, rules.minAge, rules.maxAge) && checkValidMonth) {
                Student.DOB = util.changFormatDayMMDD(Student.DOB);
                listStudentValid.push(Student)
            }
            else {
                listStudentInvalid.push(Student)
            }
        }
        catch (err) {
            listStudentInvalid.push(Student)
        }
    }
    if (amountStudent + listStudentValid.length <= rules.maxStudents) {
        constrainNumOfStudents = true;
    }
    const returnObject = {
        constrainNumOfStudents,
        listStudentValid,
        listStudentInvalid,
    }
    return returnObject;

}


exports.CSVFiletoJsonObject = async (uriFile) => {
    csv({
        noheader: false,
        headers: ['stt', 'name', 'gender', 'DOB', 'address']
    })
        .fromString(uriFile)
        .then((jsonObj) => {
            /**
             * [
             * 	{a:"1", b:"2", c:"3"},
             * 	{a:"4", b:"5". c:"6"}
             * ]
             */
        })
    const jsonArray = await csv({
        noheader: false,
        headers: ['stt', 'name', 'gender', 'DOB', 'address']
    }).fromString(uriFile);
    return jsonArray;
}

exports.getClass = async (className, year) => {
    try {
        var query_string = `SELECT * FROM CLASS WHERE name = '${className}' and _year = '${year}'`;
        let result = (await conn).query(query_string);
        return (await result).recordset[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

exports.getAllClassInYear = async (year) => {
    try {
        var query_string = `SELECT * FROM CLASS WHERE _year = '${year}'`;
        let result = (await conn).query(query_string);
        return (await result).recordset;
    } catch (error) {
        console.error(error);
        return null;
    }
}