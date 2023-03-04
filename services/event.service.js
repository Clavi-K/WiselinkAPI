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
        if (!event.organizer || !stringFieldValidation(event.organizer)) throw new Error("Missing or invalid event organizer!")
        if (!event.status || (event.status !== "PUBLISHED" && event.status !== "DRAFT")) throw new Error("Missing or invalid event status!")
        if (!event.dateTime || !stringFieldValidation(event.dateTime) || !dateValidation(event.dateTime) || new Date(event.dateTime) == "Invalid Date") throw new Error("Missing or invalid event date time!")

        try {

            event.dateTime = new Date(event.dateTime)

            return await eventModel.create(event)

        } catch (e) {
            throw new Error(e)
        }

    },

    getAll: async (userRole) => {

        try {

            const events = await eventModel.getAll()
            return userRole === "ADMIN" ? events : events.filter(e => e.status == "PUBLISHED" && e.deleted === false)

        } catch (e) {
            throw new Error(e)
        }

    },

    update: async (eventId, newEvent) => {
        if (!eventId || !stringFieldValidation(eventId)) throw new Error("Missing or invalid event ID!")

        if (newEvent.title != undefined && !stringFieldValidation(newEvent.title)) throw new Error("Missing or invalid event title!")
        if (newEvent.shortDescription != undefined && (!stringFieldValidation(newEvent.shortDescription) || newEvent.shortDescription.length > 100)) throw new Error("Missing or invalid event short description!")
        if (newEvent.longDescription != undefined && !stringFieldValidation(newEvent.longDescription)) throw new Error("Missing or invalid event long description!")
        if (newEvent.address != undefined && !stringFieldValidation(newEvent.address)) throw new Error("Missing or invalid event address!")
        if (newEvent.organizer != undefined && !stringFieldValidation(newEvent.organizer)) throw new Error("Missing or invalid event organizer!")
        if (newEvent.status != undefined && (newEvent.status !== "PUBLISHED" && newEvent.status !== "DRAFT")) throw new Error("Missing or invalid event status!")
        if (newEvent.dateTime != undefined && (!stringFieldValidation(newEvent.dateTime) || !dateValidation(newEvent.dateTime))) throw new Error("Missing or invalid event date time!")

        try {

            const updatedEvent = await eventModel.update(eventId, newEvent)
            return updatedEvent

        } catch (e) {
            throw new Error(e)
        }

    },

    eventFilter: async (role, filter) => {

        try {

            let events = await eventModel.getAll()

            if (role === "CLIENT") {
                events = events.filter(e => e.status === "PUBLISHED")
            }

            if (filter.after != undefined && stringFieldValidation(filter.after) && dateValidation(filter.after)) {
                events = events.filter(e => e.dateTime > new Date(filter.after))
            }

            if (filter.before != undefined && stringFieldValidation(filter.before) && dateValidation(filter.before)) {
                events = events.filter(e => e.dateTime < new Date(filter.before))
            }

            if (filter.status != undefined && stringFieldValidation(filter.status) && (filter.status === "DRAFT" || filter.status === "PUBLISHED")) {
                events = events.filter(e => e.status === filter.status)
            }

            if (filter.title != undefined && stringFieldValidation(filter.title)) {
                events = events.filter(e => e.title.includes(filter.title))
            }

            return events

        } catch (e) {
            throw new Error(e)
        }

    },

    deleteEvent: async (eventId) => {

        if(!eventId || !stringFieldValidation(eventId)) throw new Error("Missing or invalid event ID!")

        try {

            await eventModel.delete(eventId)

        } catch(e) {
            throw new Error(e)
        }

    }

}

/* ---------- */