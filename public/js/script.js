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
