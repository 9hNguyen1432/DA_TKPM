function changeItem_DD(item) {
    var parent=$(item).parent();
    var old_active = $(parent).find('.active');
    old_active.removeClass('active');
    $(this).addClass('active')
    var content = $(item).text()
    $(parent).prev().text(content)
    console.log(content)
}

$(document).ready(function() {
    var item_year = $('#yearmenu-dropdown')
    var text_year = $(item_year).find('.active').text()
    $(item_year).prev().text(text_year)

    var item_seme = $('#semestermenu-dropdown')
    var text = $(item_seme).find('.active').text()
    $(item_seme).prev().text(text)

    var item_class = $('#classmenu-dropdown')
    var text = $(item_class).find('.active').text()
    $(item_class).prev().text(text)

    var item_course = $('#coursemenu-dropdown')
    var text = $(item_course).find('.active').text()
    $(item_course).prev().text(text)
});

$(document).on('show.bs.modal', '#viewStudentDetailModal',event => {
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



