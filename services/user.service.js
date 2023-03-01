/* ----- REQUIRED IMPORTS ----- */

const userModel = require("../models/user.model")
const { stringFieldValidation } = require("../utils")
const config = require("../config/config")

const jwt = require("jsonwebtoken")

/* ---------- */

/* ----- SERVICE EXPORT ----- */

module.exports = {

    register: async (user) => {

        if (!user.firstName || !stringFieldValidation(user.firstName)) throw new Error("Missing or invalid user first name!")
        if (!user.lastName || !stringFieldValidation(user.lastName)) throw new Error("Missing or invalid user last name!")
        if (!user.email || !emailValidaiton(user.email)) throw new Error("Missing or invalid user email!")
        if (!user.password || !passwordValidation(user.password)) throw new Error("Missing or invalid user password!")

        try {

            const createdUser = await userModel.create(user)
            const resultUser = {
                id: createdUser.id,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                email: createdUser.email,
                role: createdUser.role
            }
            const accessToken = generateAcessToken(resultUser)
            
            return { user: resultUser, accessToken }

        } catch (e) {
            throw new Error(e)
        }

    },

    login: async (email, password) => {

        if (!email || !stringFieldValidation(email)) throw new Error("Missing or invalid email!")
        if (!password || !passwordValidation(password)) throw new Error("Missing or invalid password!")

        try {
            
            const validation = await userModel.isPasswordValid(email, password)

            if (!validation) {
                throw new Error("Invalid email or password!")
            } else {

                const returnedUser = await userModel.getByEmail(email)
                const user = {
                    id: returnedUser.id,
                    firstName: returnedUser.firstName,
                    lastName: returnedUser.lastName,
                    email: returnedUser.email,
                    role: returnedUser.role
                }
                const accessToken = generateAcessToken(user)

                return { user, accessToken }

            }

        } catch (e) {
            console.log(e)
            throw new Error(e)
        }

    }

}

/* ---------- */

/* ----- LOCAL FUNCTIONS ----- */

function emailValidaiton(email) {
    return stringFieldValidation(email) && email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/) != null
}

function passwordValidation(input) {
    // password must contain 1 number, 1 special character and at least 6 characters and max of 16
    return stringFieldValidation(input) && input.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) != null
}

function generateAcessToken(user) {
    return jwt.sign(user, config.auth.SECRET, { expiresIn: "24h" })
}

/* ---------- */