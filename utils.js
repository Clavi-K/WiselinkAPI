exports.stringFieldValidation = input => {
    return typeof input === "string" && input.trim() !== ""
}

exports.dateValidation = input => {
    if (input.split(" ").length !== 2) return false
    return true
}