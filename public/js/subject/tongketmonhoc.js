const gradeSelect = document.getElementById("select_sum_subject_grade");
const subjectSelect = document.getElementById("select_sum_subject_name");
const table = document.getElementById("summarytable");

const year = document.getElementById('yearmenu-dropdown').getAttribute("data-year");

const semester = get_semester_selected();

getData()
    .then(response => {
        console.log(response)
        return response.json();
    })
    .then(dataSet => {
        console.log(dataSet);
        renderTableRow(dataSet);
    })
    .catch(error => {
        console.error(error);
    });
async function renderDataForTable() {
    getData()
        .then(response => {
            let dataSet = response.json();
            renderTableRow(dataSet);
        })
        .catch(error => {
            // Xử lý lỗi nếu có
            console.error(error);
        });
}

gradeSelect.addEventListener('change', (event) => {
    getData()
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(dataSet => {
            console.log(dataSet);
            renderTableRow(dataSet);
        })
        .catch(error => {
            console.error(error);
        });
});

subjectSelect.addEventListener('change', (event) => {
    getData()
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(dataSet => {
            console.log(dataSet);
            renderTableRow(dataSet);
        })
        .catch(error => {
            console.error(error);
        });
});

function getData() {
    const grade = gradeSelect.value;
    const subject = subjectSelect.value;
    return fetch(`/course/${grade}/tongket/${subject}/?year=${year}&semester=${semester}`);
}

function get_semester_selected() {
    const semesterElement = document.getElementById('semmenu-select');
    let currentSemester;
    try {
        currentSemester = semesterElement.getAttribute('data-semester');
    } catch (error) {
        currentSemester = "1";
    }
    return currentSemester;
}

function renderTableRow(dataSet) {
    table.innerHTML = "";
    for (let i = 0; i < dataSet.length; i++) {
        table.innerHTML = table.innerHTML +
            `<tr>
        <th scope="row">${i + 1}</th>
        <td>${dataSet[i].name}</td>
        <td>${dataSet[i].amount_student}</td>
        <td>${dataSet[i].slDatChuan}</td>
        <td>${dataSet[i].tile}</td>
    </tr>`
    }
}
