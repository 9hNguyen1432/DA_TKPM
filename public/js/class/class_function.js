
// Lắng nghe sự kiện click trên nút chỉnh sửa
document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', async () => {
        // Lấy giá trị ID từ thuộc tính của hàng
        const studentId = button.getAttribute('data-bs-mssv');
        const className = document.querySelector('#class-header').getAttribute('data-class-name');
        const currentYear = get_year_selected();
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


        console.log(currentYear);
        // Change action of form
        if (formStudent) {
            console.log(`/class/${className}/modify_student/${studentId}`);
            formStudent.action = `/class/${className}/modify_student/${studentId}?year=${currentYear}`; 
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
    const yearElement = document.querySelector('.dropdown-item.active');
    try {
        currentYear = yearElement.getAttribute('current-year');
    } catch (error) {
        // TODO: after test, use this line and remove below line
        // currentYear = undefined; 
        currentYear = "2021-2022";
    }
}


