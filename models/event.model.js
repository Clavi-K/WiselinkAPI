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
            dateTime: { type: String, required: true },
            organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
            address: { type: String, required: true },
            state: { type: String, required: true }
        })

        this.model = model("Event", schema)

    }

    /* ----- USER MODEL METHODS ----- */

    /* ---------- */

}

/* ---------- */

/* ----- MODULE EXPORT ----- */

module.exports = new EventModel()

/* ---------- */