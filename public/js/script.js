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
    console.log("hihi")
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



