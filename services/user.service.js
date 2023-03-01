/* ----- REQUIRED IMPORTS ----- */

const userModel = require("../models/user.model")

/* ---------- */

/* ----- SERVICE EXPORT ----- */

module.exports = {

    post: async (user) => {

        if (!user.firstName || !stringFieldValidation(user.firstName)) throw new Error("Missing or invalid user first name!")
        if (!user.lastName || !stringFieldValidation(user.lastName)) throw new Error("Missing or invalid user last name!")
        if (!user.email || !emailValidaiton(user.email)) throw new Error("Missing or invalid user email!")
        if (!user.password || !passwordValidation(user.password)) throw new Error("Missing or invalid user password!")

        try {

            const createdUser = await userModel.create(user)
            return {
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                email: createdUser.email,
                role: createdUser.role
            }

        } catch (e) {
            throw new Error(e)
        }

    }

}

/* ---------- */

/* ----- LOCAL FUNCTIONS ----- */

function stringFieldValidation(input) {
    return typeof input === "string" && input.trim() !== ""
}

function emailValidaiton(email) {
    return stringFieldValidation(email) && email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/) != null
}

function passwordValidation(input) {
    // password must contain 1 number, 1 special character and at least 6 characters and max of 16
    return stringFieldValidation(input) && input.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) != null
}

/* ---------- */