
exports.getAge = (DOB) => {
    var DOByyyy = DOB.split('/')[2];

    var today = new Date();
    var yyyy = today.getFullYear();
    return yyyy - DOByyyy;
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

exports.isBetween = (vari, start, end) => {
    if (vari <= end && vari >= start) {
        return true;
    }
    return false;
}

exports.inFuture = (date) => {
    let day = new Date(date);
    let today = new Date();
    return day >= today;
}

exports.isValidListClass = (numOfClass, classNames, _class) => {
    try {
        if (numOfClass <= 0) {
            return false;
        }
        let listClassName = classNames.split(',').map(element => element.slice(0, 2) === _class);
        if (listClassName.length !== numOfClass) {
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

exports.isValidListSubject = (numOfSubject, SubjectNames) => {
    try {
        if (numOfSubject <= 0) {
            return false;
        }
        let listSubject = SubjectNames.split(',');
        if (listSubject.length !== numOfSubject) {
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

