// const { Converter } = require("csvtojson/v2/Converter");
// const { Int } = require("msnodesqlv8");

function changeYear(item) {
    // var parent = $(item).parent();
    // var old_active = $(parent).find('.active');
    // old_active.removeClass('active');
    // $(this).addClass('active')
    // var content = $(item).text()
    // $(parent).prev().text(content)
    // console.log(content)
    var new_year = $(item).text();
    $('#yearmenu-dropdown').attr("data-year", new_year)

    var cur_sem = $('#semmenu-select').val();
    var url = window.location.href;
    var controller = url.split('?')[0];

    var new_url = controller + "?year=" + new_year + "&semester=" + cur_sem;
    console.log(new_url)

    window.location.replace(new_url)

}

function changeSem(item) {
    var cur_year = $('#yearmenu_btn').text();
    var new_sem = $(item).val();
    var url = window.location.href;
    var controller = url.split('?')[0];

    var new_url = controller + "?year=" + cur_year + "&semester=" + new_sem;
    console.log(new_url)

    window.location.replace(new_url)
}

$(document).ready(function () {
    var item_year = $('#yearmenu-dropdown')
    var text_year = $(item_year).find('.active').text()
    $(item_year).prev().text(text_year)

    // var item_seme = $('#semestermenu-dropdown')
    // var text = $(item_seme).find('.active').text()
    // $(item_seme).prev().text(text)

    // var item_class = $('#classmenu-dropdown')
    // var text = $(item_class).find('.active').text()
    // $(item_class).prev().text(text)

    // var item_course = $('#coursemenu-dropdown')
    // var text = $(item_course).find('.active').text()
    // $(item_course).prev().text(text)
});

$(document).on('show.bs.modal', '#viewStudentDetailModal', event => {
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const mssv = button.getAttribute('data-bs-mssv')
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.

    //get student info with ID 


    // Update the modal's content.
    //const modalTitle = this.querySelector('.modal-title')
    const modalIDInfo = this.querySelector('.modal-body .ID')

    // modalTitle.textContent = `New message to ${recipient}`
    // modalBodyInput.value = recipient
    modalIDInfo.value = mssv;
    this.modal('show');

})
function activeYear(item) {
    var cur_year = $(item).attr('data-year')
    var child_list = $(item).children();
    console.log(cur_year)
    for (var i = 0; i < child_list.length; i++) {
        var child = child_list.eq(i);
        var year = child.text();
        if (year === cur_year) {
            child.addClass('active');
            break;
        }
    }

}

function activeSem(item) {
    var semester = $(item).attr('data-semester')
    console.log(semester)
    var child_list = $(item).children();
    for (var i = 0; i < child_list.length; i++) {
        var child = child_list.eq(i);
        var child_sem = child.val();
        if (child_sem === semester) {
            child.attr("selected", "selected")
            console.log(child_sem)
            break;
        }
    }

}


document.addEventListener("DOMContentLoaded", function () {
    console.log("hihi")
    activeYear(document.getElementById("yearmenu-dropdown"));
    activeSem(document.getElementById("semmenu-select"))
});

setTimeout(function () {
    $('.alert').alert('close');
}, 5000);

function validateAddClassForm() {
    var result = true;

    let class_name = document.forms["form-add-class"]["class_name"].value;
    let grade = document.forms["form-add-class"]["grade"].value;
    let grade_in_name = class_name.slice(0, 2)
    console.log(class_name, grade, grade_in_name)
    if (grade_in_name != grade) {
        $('#class_name_span').text("Hai ký tự đầu phải trùng với khối học.")
        result = false;
    }

    let teacher = document.forms["form-add-class"]["teacher"].value;
    if (teacher == "") {
        $('#teacher_span').text("Không được để trống.")
        result = false;
    }

    return result;
}

let currentCourse = "";

function viewCourseDetail(item) {
    let cur_year = $('#yearmenu-dropdown').attr("data-year");
    let cur_semester = $('#semmenu-select').val();
    let cur_class = $(item).attr("data-class")
    let course_name = $(item).attr("data-course");
    currentCourse = course_name;
    $('#course_name').text("Môn : " + course_name)

    let import_link = $('#import_link').attr('href');
    let new_link_1 = import_link.replace("CourseName",course_name)
    $('#import_link').attr('href',new_link_1)

    // let dowloadTranscript_link = $('#dowloadTranscript_link').attr('href');
    // let new_link_2 = dowloadTranscript_link.replace("CourseName",course_name)
    // $('#dowloadTranscript_link').attr('href',new_link_2)

    $('#courses_detail_table tbody tr').remove();
    $('#courses_detail_table tbody div').remove();

    if($('#transcript').css('visibility')=="hidden"){
        $('#transcript').css('visibility',"visible")
    }

    $.ajax({
        type: "get",
        url: "/class/" + cur_class + "/course/" + course_name + "?year=" + cur_year + "&semester=" + cur_semester,
        data: {
        },
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                var newRow = $('<tr>');
                // Add cells to the new row
                newRow.append($(`<th scope="row">`).text(data[i].ID));
                newRow.append($('<td>').text(data[i].Name));
                newRow.append($('<td>').text(data[i].exam_15));
                newRow.append($('<td>').text(data[i].exam_45));
                newRow.append($('<td>').text(data[i].exam_Sem));
                // Add the new row to the table body
                $('#courses_detail_table tbody').append(newRow);
            }
        },
        error: function (res) {
            var notice = $('<div>').text("Dữ liệu không tồn tại !")
            $('#courses_detail_table tbody').append(notice)
        }
    });
}


function viewFirstCourse() {

}

function downloadTranscript(){
    const year = $('#yearmenu-dropdown').attr("data-year");
    const semester = $('#semmenu-select').val();
    const className = document.querySelector('#class_name').getAttribute('data-class-name');
    fetch(`/class/${className}/course/${currentCourse}/download-transcript?year=${year}&semester=${semester}`)
        .then(response => response.json())
        .then(csvData => {
            // Tạo đối tượng Blob từ chuỗi CSV
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            // Tải file CSV với tên file và mã hóa Unicode đúng cách
            saveAs(blob, `bangdiem_${className}_${year}_${semester}.csv`);
        });
}




