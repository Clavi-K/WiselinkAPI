/* ----- REQUIRED IMPORTS ----- */

const eventModel = require("../models/event.model")
const userModel = require("../models/user.model")
const { stringFieldValidation, dateValidation } = require("../utils")

/* ---------- */

/* ----- SERVICE EXPORT ----- */

module.exports = {

    create: async (event) => {

        if (!event.title || !stringFieldValidation(event.title)) throw new Error("Missing or invalid event title!")
        if (!event.shortDescription || !stringFieldValidation(event.shortDescription) || event.shortDescription.length > 100) throw new Error("Missing or invalid event short description!")
        if (!event.longDescription || !stringFieldValidation(event.longDescription)) throw new Error("Missing or invalid event long description!")
        if (!event.address || !stringFieldValidation(event.address)) throw new Error("Missing or invalid event address!")
        if (!event.status || (event.status !== "PUBLISHED" && event.status !== "DRAFT")) throw new Error("Missing or invalid event status!")
        if (!event.organizer || !stringFieldValidation(event.organizer)) throw new Error("Missing or invalid event organizer ID!")
        if (!event.dateTime || !stringFieldValidation(event.dateTime) || !dateValidation(event.dateTime) || new Date(event.dateTime) == "Invalid Date") throw new Error("Missing or invalid event date time!")

        try {

            const user = await userModel.getById(event.organizer)

            if (!user) throw new Error("There is no user with that ID!")
            if (user.role !== "ADMIN") throw new Error("This user is not allowed to create an event!")

            event.dateTime = new Date(event.dateTime)

            return await eventModel.create(event)

        } catch (e) {
            throw new Error(e)
        }

    },

    getAll: async () => {

        try {

            return await eventModel.getAll()

        } catch (e) {
            throw new Error(e)
        }

    },

    update: async (eventId, newEvent) => {

        if (!eventId || !stringFieldValidation(eventId)) throw new Error("Missing or invalid event ID!")
        if (!newEvent) throw new Error("Missing event object!")

        try {

            const updatedEvent = await eventModel.update(eventId, newEvent)
            return updatedEvent

        } catch (e) {
            throw new Error(e)
        }

    }

}

/* ---------- */