// Lắng nghe sự kiện click trên nút chỉnh sửa
document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', async () => {
        // Lấy giá trị ID từ thuộc tính của hàng
        const studentId = button.getAttribute('data-bs-mssv');
        const className = document.querySelector('#class-header').getAttribute('data-class-name');
        const currentYear = get_year_selected();
        const currentSemester = get_semester_selected();
        const formStudent = document.querySelector('#form-student');
        const btnImportListStudent = document.querySelector('#btn-import-list-student');

        if (btnImportListStudent) {
            btnImportListStudent.style.display = 'none';
        }

        // Thực hiện các tác vụ cần thiết với ID học sinh, ví dụ: truy vấn cơ sở dữ liệu để lấy thông tin học sinh
        let response = await get_information(studentId, className, currentYear);
        let studentData = await response.json();

        var dateObject = moment(studentData.dob, 'DD/MM/YYYY').toDate();
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Tháng trong JavaScript được đánh số từ 0 (0 - 11)
        const year = dateObject.getFullYear();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;


        // Change action of form
        if (formStudent) {
            formStudent.action = `/class/${className}/modify_student/${studentId}?year=${currentYear}&semester=${currentSemester}`;
        }

        // Hiển thị thông tin học sinh trong modal
        var modal_form_student = document.getElementById('student_form');

        var modal_student_title = modal_form_student.querySelector('#form-student-title');
        var modal_student_name = modal_form_student.querySelector('#form-student-name');
        var modal_student_gender_male = modal_form_student.querySelector('#male');
        var modal_student_gender_female = modal_form_student.querySelector('#female');
        var modal_student_birthday = modal_form_student.querySelector('#birthday');
        var modal_student_address = modal_form_student.querySelector('#address');
        var modal_student_email = modal_form_student.querySelector('#email');
        var modal_student_note = modal_form_student.querySelector('#note');


        modal_student_title.textContent = "CHỈNH SỬA THÔNG TIN";
        modal_student_name.value = studentData.name;

        if (studentData.gender === "Nam") {
            modal_student_gender_male.checked = true;
        }
        else modal_student_gender_female.checked = true;

        modal_student_birthday.value = formattedDate;
        modal_student_address.value = studentData.address === undefined ? "" : studentData.address;
        modal_student_email.value = studentData.email === undefined ? "" : studentData.email;
        modal_student_note.value = studentData.note === undefined ? "" : studentData.note;
    });
});

async function get_information(studentId, class_name, year) {
    let studentData = await fetch(`/class/${class_name}/modify_student/${studentId}?year=${year}`);
    return await studentData;
}

function get_year_selected() {
    const yearElement = document.getElementById('yearmenu-dropdown');
    let currentYear;
    try {
        currentYear = yearElement.getAttribute('data-year');
    } catch (error) {
        // TODO: after test, use this line and remove below line
        // currentYear = undefined; 
        currentYear = "2021-2022";
    }
    return currentYear;
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


// Lắng nghe sự kiện click trên nút Xóa học sinh
document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', async () => {
        // Lấy giá trị ID từ thuộc tính của hàng
        const studentId = button.getAttribute('data-bs-mssv');
        const className = document.querySelector('#class-header').getAttribute('data-class-name');
        const currentYear = get_year_selected();
        const currentSemester = get_semester_selected();
        const modalDeleteStudent = document.querySelector('#form-delete');

        // Change action of form
        if (modalDeleteStudent) {
            modalDeleteStudent.action = `/class/${className}/delete_student/${studentId}?year=${currentYear}&semester=${currentSemester}`;
        }
    });
});

// Lắng nghe sự kiện click trên nút THÊM HỌC SINH
document.getElementById('btn_add_student').addEventListener('click', async () => {
    // reset date in input field
    var modal_form_student = document.getElementById('student_form');
    var modal_student_title = modal_form_student.querySelector('#form-student-title');
    modal_student_title.textContent = "TIẾP NHẬN HỌC SINH";

    var modal_student_name = modal_form_student.querySelector('#form-student-name');
    var modal_student_gender_male = modal_form_student.querySelector('#male');
    var modal_student_birthday = modal_form_student.querySelector('#birthday');
    var modal_student_address = modal_form_student.querySelector('#address');
    var modal_student_email = modal_form_student.querySelector('#email');
    var modal_student_note = modal_form_student.querySelector('#note');

    modal_student_name.value = "";
    modal_student_gender_male.checked = true;
    modal_student_birthday.value = "";
    modal_student_address.value = "";
    modal_student_email.value = "";
    modal_student_note.value = "";
    // end reset

    const formStudent = document.querySelector('#form-student');
    // Change action of form
    if (formStudent) {
        const currentSelectedYear = get_year_selected();
        const currentSemester = get_semester_selected();
        const className = document.querySelector('#class-header').getAttribute('data-class-name');
        formStudent.action = `/class/${className}/add_a_student?year=${currentSelectedYear}&semester=${currentSemester}`;
    }
})


//Lắng nghe sự kiện click trên nút Xuất danh sách học sinh
document.getElementById('btn_export_students').addEventListener('click', () => {
    const year = get_year_selected();
    const semester = get_semester_selected();
    const className = document.querySelector('#class-header').getAttribute('data-class-name');
    fetch(`/class/${className}/export/list_student?year=${year}&semester=${semester}`)
        .then(response => response.json())
        .then(csvData => {
            // Tạo đối tượng Blob từ chuỗi CSV
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            // Tải file CSV với tên file và mã hóa Unicode đúng cách
            saveAs(blob, `students_${className}.csv`);
        });
})