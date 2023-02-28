/* ----- REQUIRED IMPORTS ----- */

const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

/* ---------- */

/* ----- USER MODEL CLASS ----- */

class UserModel {

    constructor() {

        const schema = new Schema({
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            role: { type: String, required: true }
        })

        this.model = model("User", schema)

    }

    /* ----- USER MODEL METHODS ----- */

    /* ---------- */

}

/* ---------- */

/* ----- MODULE EXPORT ----- */

module.exports = new UserModel()

/* ---------- */