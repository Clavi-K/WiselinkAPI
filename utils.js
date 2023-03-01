exports.stringFieldValidation = input => {
    return typeof input === "string" && input.trim() !== ""
}

exports.dateValidation = input => {
    if (input.split(" ").length !== 2) return false
    if(new Date(input) == "Invalid Date") return false
    
    return true
}