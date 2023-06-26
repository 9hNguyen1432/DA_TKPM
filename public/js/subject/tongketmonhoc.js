const gradeSelect = document.getElementById("select_sum_subject_grade");
const subjectSelect = document.getElementById("select_sum_subject_name");

gradeSelect.addEventListener('change', (event) => {
    getData();
});

subjectSelect.addEventListener('change', (event) => {
    getData();
});

function getData(params){
    const grade = gradeSelect.value;
    const subject = subjectSelect.value;
    fetch(`/course/${grade}/tongket/${subject}/?year=2021-2022&semester=2`);
}