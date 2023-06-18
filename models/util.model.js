
exports.getAge = (DOB) => {
    var DOByyyy = DOB.split('/')[2];

    var today = new Date();
    var yyyy = today.getFullYear();
    return yyyy-DOByyyy;
}
exports.checkValidMonth = (DOB) => {
    var DOBmm = DOB.split('/')[1];
    return DOBmm <= 12;
}
exports.changFormatDayMMDD = (DOB) => {
    var DOBsplit = DOB.split('/');
    temp = DOBsplit[0];
    DOBsplit[0] = DOBsplit[1];
    DOBsplit[1] = temp;

    return DOBsplit.join("/");
}

exports.isBetween = (vari, start, end)=>{
    if (vari <= end && vari >= start){
        return true;
    }
    return false;
}

exports.inFuture=(date)=>{
    let day = new Date(date);
    let today = new Date();
    return day>=today;
}
