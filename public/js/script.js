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

    var item_seme = $('#summary-semester-dropdown')
    var text = $(item_seme).find('.active').text()
    $(item_seme).prev().text(text)

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
        if (year == cur_year) {
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
        if (child_sem == semester) {
            child.attr("selected", "selected")
            console.log(child_sem)
            break;
        }
    }

}

function activeSemesterInSummary(item) {

    var cur_sem = $(item).attr('data-semester')
    var child_list = $(item).children();
    console.log(cur_sem)
    for (var i = 0; i < child_list.length; i++) {
        var child = child_list.eq(i);
        var year = child.text();
        if (year == cur_sem) {
            child.addClass('active');
            break;
        }
    }

}


document.addEventListener("DOMContentLoaded", function () {
    activeYear(document.getElementById("yearmenu-dropdown"));
    activeSem(document.getElementById("semmenu-select"))
    let item = document.getElementById("summary-semester-dropdown")
    if (item !== undefined && item !== null) {
        activeSemesterInSummary(item)
    }

    $('#addYearModal').on('load', loadAddYearForm());
});

setTimeout(function () {
    $('.alert-fade').alert('close');
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
    $('#course_name').children().eq(0).text(course_name)

    let import_link = $('#import_link').attr('href');
    let new_link_1 = import_link.split('/');
    new_link_1[4] = course_name; new_link_1 = new_link_1.join('/');
    $('#import_link').attr('href', new_link_1)
    // let dowloadTranscript_link = $('#dowloadTranscript_link').attr('href');
    // let new_link_2 = dowloadTranscript_link.replace("CourseName",course_name)
    // $('#dowloadTranscript_link').attr('href',new_link_2)

    $('#courses_detail_table tbody tr').remove();
    $('#courses_detail_table tbody div').remove();

    let parent = $(item).parent();
    var child_list = $(parent).children();
    let old_active = parent.find('.active')
    old_active.removeClass('active')
    old_active_img = $(old_active).find('div img');
    old_active_img.css('visibility', 'hidden')

    $(item).addClass('active')
    new_active_img = $(item).find('div img');
    new_active_img.css('visibility', 'visible')

    if ($('#transcript').css('visibility') == "hidden") {
        $('#transcript').css('visibility', "visible")
    } ``
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


function changeStartYear(item) {
    let start_year = $(item).val()
    let end_year = parseInt(start_year) + 1;

    $('#end_year').val(end_year)
}

function downloadTranscript() {
    const year = $('#yearmenu-dropdown').attr("data-year");
    const semester = $('#semmenu-select').val();
    const className = document.querySelector('#class_name').getAttribute('data-class-name');
    fetch(`/class/${className}/course/${currentCourse}/download-transcript?year=${year}&semester=${semester}`)
        .then(response => response.json())
        .then(csvData => {
            // Tạo đối tượng Blob từ chuỗi CSV
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            // Tải file CSV với tên file và mã hóa Unicode đúng cách
            saveAs(blob, `bangdiem_${className}_${currentCourse}_${year}_${semester}.csv`);
        });
}



function loadAddYearForm() {

    let cur_year = $("#addYearForm").attr("data-year")

    let start_year = cur_year.slice(0, 4);
    $("#start_year").val(start_year)
    $("#end_year").val(parseInt(start_year) + 1)

    $.ajax({
        type: "get",
        url: "/setting/data?year=" + cur_year,
        data: {
        },
        success: function (data) {
            if (data != null && data.length != 0) {
                console.log(data)

                $('#addYearForm input[name="min_age"]').val(data.min_age);
                $('#addYearForm input[name="max_age"]').val(data.max_age);
                $('#addYearForm input[name="max_student"]').val(data.max_student);
                $('#addYearForm input[name="standard_score"]').val(data.standard_score);
                $('#addYearForm input[name="num_of_class_10"]').val(data.num_of_class_10);
                // $('#addYearForm input[name="name_class_10"]').val(data.name_class_10);
                $('#addYearForm input[name="num_of_class_11"]').val(data.num_of_class_11);
                // $('#addYearForm input[name="name_class_11"]').val(data.name_class_11);
                $('#addYearForm input[name="num_of_class_12"]').val(data.num_of_class_12);
                // $('#addYearForm input[name="name_class_12"]').val(data.name_class_12);
                $('#addYearForm input[name="num_of_subject"]').val(data.num_of_subject);
                // $('#addYearForm input[name="name_of_subject"]').val(data.name_of_subject);

                //name class 10
                let container_alert_10 = $('#alerts-name-class-10')
                let hidden_input_10 = $(container_alert_10).next().next()
                hidden_input_10.val(data.name_class_10.trim())
                let arr_10 = data.name_class_10.split(", ");
                for (let i = 0; i < arr_10.length; i++) {
                    addAlert(arr_10[i], container_alert_10)
                }

                //name class 11
                let container_alert_11 = $('#alerts-name-class-11')
                let hidden_input_11 = $(container_alert_11).next().next()
                hidden_input_11.val(data.name_class_11.trim())
                let arr_11 = data.name_class_11.split(", ");
                for (let i = 0; i < arr_11.length; i++) {
                    addAlert(arr_11[i], container_alert_11)
                }

                //name class 10
                let container_alert_12 = $('#alerts-name-class-12')
                let hidden_input_12 = $(container_alert_12).next().next()
                hidden_input_12.val(data.name_class_12.trim())
                let arr_12 = data.name_class_12.split(", ");
                for (let i = 0; i < arr_12.length; i++) {
                    addAlert(arr_12[i], container_alert_12)
                }

                //name course
                let container_alert_course = $('#alerts-name-course')
                let hidden_input_course = $(container_alert_course).next().next()
                hidden_input_course.val(data.name_of_subject.trim())
                let arr_course = data.name_of_subject.split(", ");
                for (let i = 0; i < arr_course.length; i++) {
                    addAlert(arr_course[i], container_alert_course)
                }
            }

        },
        error: function (res) {
            // var notice = $('<div>').text("Dữ liệu không tồn tại !")
            // $('#courses_detail_table tbody').append(notice)
        }
    });
}

function addAlert(_text, _container) {
    // Tạo phần tử div
    var div = $('<div>', {
        'class': 'alert flex alert-success alert-dismissible show me-2',
        'role': 'alert',
        'style': 'width: fit-content; padding: 5px;min-width: fit-content; padding-right: 35px'
    });

    // Tạo phần tử strong và đặt nội dung
    var strong = $('<strong>').text(_text);

    // Tạo phần tử button
    var button = $('<button>', {
        'type': 'button',
        'class': 'btn-close',
        'style': 'padding: 10px;',
        'aria-label': 'Close',
        'onclick': 'removeAlert(this)'
    });

    // Gắn strong và button vào div
    div.append(strong, button);

    // Gắn div vào một phần tử có id là 'container'
    $(_container).append(div);
    $(_container).scrollLeft($(_container)[0].scrollWidth);
}

function addClass_BtnClick(item) {
    let new_class = $(item).prev().val().trim()
    if (new_class == undefined || new_class == null || new_class == "") {
        return;
    }

    let container = $(item).parent().parent().next();
    let error_div = $(container).next()
    let info = ""

    let grade = $(item).attr('data-grade');
    if (grade == undefined || grade == null) {
        grade = ""
        info = "môn"
    } else {
        info = "lớp"
    }

    //check ten lop
    if (grade != "" && new_class.slice(0, 2) != grade) {
        $(error_div).text('Hai ký tự đầu phải trùng với khối học.')
        return;
    }

    let child_list = $(container).children()
    let number_default = $(container).parent().parent().prev().find('div input').val()

    //check so luong
    if (number_default <= child_list.length) {
        $(error_div).text('Đã đủ số lượng ' + info + ' học mặc định: ' + number_default)
        return;
    }

    //check trung ten
    for (let i = 0; i < child_list.length; i++) {
        let child = child_list.eq(i).find('strong')

        if (child.text() == new_class) {
            $(error_div).text("Trùng tên " + info + " học đã có.")
            return;
        }
    }

    //add
    let hidden_input = $(error_div).next();
    if (hidden_input.val().trim() == "") {
        hidden_input.val(new_class)
    }
    else {
        hidden_input.val(hidden_input.val() + ", " + new_class)
    }

    addAlert(new_class, container)
    $(error_div).text('')
}

function removeAlert(item) {
    let hidden_input = $(item).parent().parent().next().next();
    let hidden_text = hidden_input.val()

    let _text = $(item).prev().text();

    let new_text = hidden_text.split(", " + _text).join("");

    hidden_input.val(new_text)
    $(item).parent().remove()
}

function validateAddYearForm(element) {
    var result = true;
    let yearsData = element.dataset.years;
    console.log(yearsData)
    let strings = JSON.parse(yearsData);
    console.log(strings)
    //check age
    var minage = document.forms["addYearForm"]["min_age"].value;
    var maxage = document.forms["addYearForm"]["max_age"].value;
    if (maxage < minage) {
        $("#error-chung").text('Tuổi tối đa phải lớn hơn tuổi tối thiểu.')
        result=false;
    }

    //check number student max
    var number_student_max = document.forms["addYearForm"]["max_student"].value;
    if(number_student_max<=0){
        $("#error-chung").text('Số lượng học sinh tối đa phải dương (>0).')
        result=false;
    }

    //check standard score
    var standard_score = document.forms["addYearForm"]["standard_score"].value;
    if(standard_score<=0.25){
        $("#error-chung").text('Điểm chuẩn phải dương (>0).')
        result=false;
    }

    //check number class 10
    let class_10_str = document.forms["addYearForm"]["name_class_10"].value;
    let number_class_10 = document.forms["addYearForm"]["num_of_class_10"].value
    if (class_10_str.split(", ").length != number_class_10) {
        $("#error-class-10").text('Không đúng với số lớp đã nhập: '+number_class_10)
        result = false;
    }

    //check number class 11
    let class_11_str = document.forms["addYearForm"]["name_class_11"].value;
    let number_class_11 = document.forms["addYearForm"]["num_of_class_11"].value
    if (class_11_str.split(", ").length != number_class_11) {
        $("#error-class-11").text('Không đúng với số lớp đã nhập: '+number_class_11)
        result = false;
    }

    //check number class 12
    let class_12_str = document.forms["addYearForm"]["name_class_12"].value;
    let number_class_12 = document.forms["addYearForm"]["num_of_class_12"].value
    if (class_12_str.split(", ").length != number_class_12) {
        $("#error-class-12").text('Không đúng với số lớp đã nhập: '+number_class_12)
        result = false;
    }

    //check list course
    let course_str = document.forms["addYearForm"]["name_of_subject"].value;
    let num_of_subject = document.forms["addYearForm"]["num_of_subject"].value
    if (course_str.split(", ").length != num_of_subject) {
        $("#error-course").text('Không đúng với số môn đã nhập: '+num_of_subject)
        result = false;
    }

    return result;
}