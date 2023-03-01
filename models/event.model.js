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
            organizer: { type: Schema.Types.ObjectId, ref: "User", required: true }
        })

        this.model = model("Event", schema)

    }

    /* ----- EVENT MODEL METHODS ----- */

    async create(event) {
        return await this.model.create(event)
    }

    async getById(eventId) {
        return await this.model.findById(eventId)
    }

    async getActive() {
        const events = await this.model.find({ status: "PUBLISHED" })
        return events.filter(e => e.dateTime > Date.now())
    }

    async getActive() {
        const events = await this.model.find({ status: "PUBLISHED" })
        return events.filter(e => e.dateTime < Date.now())
    }

    /* ---------- */

}

/* ---------- */

/* ----- MODULE EXPORT ----- */

module.exports = new EventModel()

/* ---------- */