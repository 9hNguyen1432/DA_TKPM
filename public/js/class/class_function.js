
// Lắng nghe sự kiện click trên nút chỉnh sửa
document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', async () => {
        // Lấy giá trị ID từ thuộc tính của hàng
        const studentId = button.getAttribute('data-bs-mssv');

        // Thực hiện các tác vụ cần thiết với ID học sinh, ví dụ: truy vấn cơ sở dữ liệu để lấy thông tin học sinh
        let response = await get_information(studentId, '10A1');
        let studentData = await response.json();

        var dateObject = moment(studentData.birthday, 'DD/MM/YYYY').toDate();
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Tháng trong JavaScript được đánh số từ 0 (0 - 11)
        const year = dateObject.getFullYear();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        // Hiển thị thông tin học sinh trong modal
        var modal_form_student = document.getElementById('student_form');

        var modal_student_title = modal_form_student.querySelector('#form-student-title');
        var modal_student_name = modal_form_student.querySelector('#form-student-name');
        var modal_student_gender_mail = modal_form_student.querySelector('#mail');
        var modal_student_gender_femail = modal_form_student.querySelector('#femail');
        var modal_student_birthday = modal_form_student.querySelector('#birthday');
        var modal_student_address = modal_form_student.querySelector('#address');
        var modal_student_phone = modal_form_student.querySelector('#phone');
        var modal_student_note = modal_form_student.querySelector('#note');


        modal_student_title.textContent = "CHỈNH SỬA THÔNG TIN";
        modal_student_name.value = studentData.name;

        if (studentData.gender === "mail") {
            modal_student_gender_mail.checked = true;
        }
        else modal_student_gender_femail.checked = true;

        modal_student_birthday.value = formattedDate;
        modal_student_address.value = studentData.address;
        modal_student_phone.value = studentData.phone;
        modal_student_note.value = studentData.note;
    });
});



async function get_information(studentId, class_name) {
    let studentData = await fetch(`/class/${class_name}/modify_student/${studentId}`);
    return await studentData;
}



