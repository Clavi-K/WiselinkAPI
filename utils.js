exports.stringFieldValidation = (input) => {
    return typeof input === "string" && input.trim() !== ""
}
