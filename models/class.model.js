const csv = require('csvtojson')

exports.checkListStudent = async (listStudent, semester) => {
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
            if (util.isBetween(age, rules.minAge, rules.maxAge)) {
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
    if (listStudentValid.length <= rules.maxStudent) {
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