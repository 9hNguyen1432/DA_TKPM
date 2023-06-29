var conn = require('./connect.model').conn
var crypto = require('crypto')

module.exports = {
    getSemeterSummary: async (_year, _semester) => {
        if(_semester==3){
            _semester = "1,2"
        }
        try {
            var query_string = `Declare @standard_score float
                                Declare @num_of_subject float
                                select @standard_score=standard_score from PARAMETERS where _year = '${_year}'
                                select @num_of_subject=num_of_subject from PARAMETERS where _year = '${_year}'
                                select cl.id, cl.name, cl.amount_student, count(*) Reached, CONVERT(INT,(1.0)*count(*)/cl.amount_student*100) Rate
                                from CLASS cl
                                join STUDENT st on cl.id=st.class_id
                                join (	select student_id, AVG(mark) mark, count(subject_id) course_number
                                        from  RESULT
                                        where _year='${_year}'
                                        and _semester IN (${_semester})
                                        group by student_id) re on re.student_id=st.id
                                where re.mark>@standard_score
                                and cl._year='${_year}'
                                and course_number= @num_of_subject    
                                group by cl.id, cl.name, cl.amount_student`;
            let result = (await conn).query(query_string);
            return (await result).recordset;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}