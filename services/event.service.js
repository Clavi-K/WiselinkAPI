/* ----- REQUIRED IMPORTS ----- */

const eventModel = require("../models/event.model")
const userModel = require("../models/user.model")
const { stringFieldValidation } = require("../utils")

/* ---------- */

/* ----- SERVICE EXPORT ----- */

module.exports = {

    create: async (event) => {

        if (!event.title || !stringFieldValidation(event.title)) throw new Error("Missing or invalid event title!")
        if (!event.shortDescription || !stringFieldValidation(event.shortDescription)) throw new Error("Missing or invalid event short description!")
        if (!event.longDescription || !stringFieldValidation(event.longDescription)) throw new Error("Missing or invalid event long description!")
        if (!event.address || !stringFieldValidation(event.address)) throw new Error("Missing or invalid event address!")
        if (!event.status || (event.status !== "PUBLISHED" && event.status !== "DRAFT")) throw new Error("Missing or invalid event status!")
        if (!event.organizer || !stringFieldValidation(event.organizer)) throw new Error("Missing or invalid event organizer ID!")
        if (!event.dateTime || !event.dateTime instanceof Date) throw new Error("Missing or invalid event date time!")

        try {

            const user = await userModel.getById(event.organizer)

            if (!user) throw new Error("There is no user with that ID!")
            if (user.role !== "ADMIN") throw new Error("This user is not allowed to create an event!")

            return await eventModel.create(event)

        } catch (e) {
            throw new Error(e)
        }

    }

}

/* ---------- */