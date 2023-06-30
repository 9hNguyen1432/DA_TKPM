var conn = require('./connect.model').conn

exports.getRegulation = async (year) => {
    try {
        var query_string = `SELECT * FROM PARAMETERS WHERE _year = '${year}'`;
        let result = (await conn).query(query_string);
        return (await result).recordset[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}
const isExitsRegulation = async (_year) => {
    try {
        var query_string = `SELECT * FROM PARAMETERS WHERE _year = '${_year}'`;
        let result = (await conn).query(query_string);
        return (await result).recordset.length > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}
exports.addRegulation = async (regulation) => {

    var _year=regulation._year;
    if(_year==undefined||_year==null){
        _year=""+regulation.start_year+"-"+(parseInt(regulation.start_year)+1)
    }
    //
    console.log(_year)
    if (await isExitsRegulation(_year)) {
        conn.then(pool => {
            let query_string = `update PARAMETERS SET
	                min_age='${regulation.min_age}',
	                max_age='${regulation.max_age}',
	                max_student='${regulation.max_student}',
	                num_of_class_10='${regulation.num_of_class_10}',
	                num_of_class_11='${regulation.num_of_class_11}',
	                num_of_class_12='${regulation.num_of_class_12}',
	                name_class_10='${regulation.name_class_10}',
	                name_class_11='${regulation.name_class_11}',
	                name_class_12='${regulation.name_class_12}',
	                num_of_subject='${regulation.num_of_subject}',
	                name_of_subject=N'${regulation.name_of_subject}',
	                standard_score='${regulation.standard_score}'
            where _year = '${_year}'
            `

            return pool.request().query(query_string);
        }).then(result => {
            console.log(result.recordset);
        }).catch(err => {
            console.error('Lỗi truy vấn:', err);
        });
        return;
    }
    else {
        conn.then(pool => {
            let query_string = `INSERT INTO PARAMETERS (
            _year,
            min_age,
            max_age,
            max_student,
            num_of_class_10,
            num_of_class_11,
            num_of_class_12,
            name_class_10,
            name_class_11,
            name_class_12,
            num_of_subject,
            name_of_subject,
            standard_score)
            values ('${_year}',
            '${regulation.min_age}',
            '${regulation.max_age}',
            '${regulation.max_student}',
            '${regulation.num_of_class_10}',
            '${regulation.num_of_class_11}',
            '${regulation.num_of_class_12}',
            '${regulation.name_class_10}',
            '${regulation.name_class_11}',
            '${regulation.name_class_12}',
            '${regulation.num_of_subject}',
            N'${regulation.name_of_subject}',
            '${regulation.standard_score}')`
            console.log(query_string)
            return pool.request().query(query_string);

        }).then(result => {
            console.log(result.recordset);
        }).catch(err => {
            console.error('Lỗi truy vấn:', err);
        });
    }
}