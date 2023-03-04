/* ----- REQUIRED IMPORTS ----- */

const userModel = require("../models/user.model")
const { stringFieldValidation } = require("../utils")
const config = require("../config/config")

const jwt = require("jsonwebtoken")
const eventModel = require("../models/event.model")

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
                role: createdUser.role,
                events: createdUser.events
            }
            const accessToken = generateAcessToken(resultUser)

            return accessToken

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
                    role: returnedUser.role,
                    events: returnedUser.events
                }
                const accessToken = generateAcessToken(user)

                return accessToken

            }

        } catch (e) {
            throw new Error(e)
        }

    },

    addEvent: async (userId, eventId) => {

        if (!userId || !stringFieldValidation(userId)) throw new Error("Missing or invalid user ID!")
        if (!eventId || !stringFieldValidation(eventId)) throw new Error("Missing or invalid event ID!")

        try {

            const user = await userModel.getById(userId)
            if (!user) throw new Error("There is no user with that ID!")

            const event = await eventModel.getById(eventId)
            if (!event) throw new Error("There is no evetn with that ID!")
            if (event.status === "DRAFT") throw new Error("You can't assist to a draft event!")

            if (event.dateTime < Date.now()) throw new Error("You can't assist to an event that has already happened!")
            if (user.events.includes(eventId)) throw new Error("You are already enroled in this event!")

            user.events.push(eventId)
            await user.save()

        } catch (e) {
            throw new Error(e)
        }

    },

    getUserEvents: async (userId, status) => {

        if (!userId || !stringFieldValidation(userId)) throw new Error("Missing or invalid user ID!")

        try {

            const userEvents = await userModel.getUserEvents(userId)
            if (!userEvents) throw new Error("There is no user with that ID!")

            if (status === "active") return userEvents.filter(e => e.dateTime > Date.now())
            if (status === "past") return userEvents.filter(e => e.dateTime < Date.now())

            return userEvents

        } catch (e) {
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