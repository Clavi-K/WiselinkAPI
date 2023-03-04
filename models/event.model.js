/* ----- REQUIRED IMPORTS ----- */

const { Schema, model } = require("mongoose")

/* ---------- */

/* ----- EVENT MODEL CLASS ----- */

class EventModel {

    constructor() {

        const schema = new Schema({
            title: { type: String, required: true },
            shortDescription: { type: String, required: true },
            longDescription: { type: String, required: true },
            dateTime: { type: Date, required: true },
            address: { type: String, required: true },
            status: { type: String, enum: ["DRAFT", "PUBLISHED"], required: true },
            organizer: { type: String, required: true },
            deleted: { type: Boolean, default: false }
        })

        this.model = model("Event", schema)

    }

    /* ----- EVENT MODEL METHODS ----- */

    async create(event) {
        return await this.model.create(event)
    }

    async getAll() {
        return await this.model.find({})
    }

    async getById(eventId) {
        try {
            return await this.model.findById(eventId)
        } catch (e) {
            return undefined
        }
    }

    async getActive() {
        const events = await this.model.find({ status: "PUBLISHED", deleted: false })
        return events.filter(e => e.dateTime > Date.now())
    }

    async getPast() {
        const events = await this.model.find({ status: "PUBLISHED", deleted: false })
        return events.filter(e => e.dateTime < Date.now())
    }

    async update(eventId, newEvent) {
        const updated = await this.model.findOneAndUpdate({ _id: eventId }, newEvent, { new: true, upsert: false })
        return updated
    }

    async delete(eventId) {
        return await this.model.updateOne({ _id: eventId }, { deleted: true }, { new: true, upsert: false })
    }

    /* ---------- */

}

/* ---------- */

/* ----- MODULE EXPORT ----- */

module.exports = new EventModel()

/* ---------- */