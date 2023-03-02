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
            role: { type: String, enum: ["CLIENT", "ADMIN"], default: "CLIENT" },
            events: { type: [Schema.Types.ObjectId], ref: "Event", default: [] }
        })

        this.model = model("User", schema)

    }

    /* ----- USER MODEL METHODS ----- */

    async create(user) {
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(12))
        return await this.model.create(user)
    }

    async getById(userId) {
        try {
            return await this.model.findById(userId)
        } catch (e) {
            return undefined
        }
    }

    async getByEmail(email) {
        try {
            return await this.model.findOne({ email })
        } catch (e) {
            return undefined
        }
    }

    async setRole(userId, role) {
        const user = await this.model.findById(userId)
        user.role = role
        await user.save()
    }

    async isAdmin(userId) {
        const user = await this.model.findById(userId)
        return user.role === "ADMIN"
    }

    async isPasswordValid(email, password) {
        const user = await this.model.findOne({ email })
        return await bcrypt.compare(password, user.password)
    }

    async getUserEvents(userId) {
        try {
            const user = await this.model.findById(userId).populate("events")
            return user.events
        } catch(e) {
            return undefined
        }
    }

    /* ---------- */

}

/* ---------- */

/* ----- MODULE EXPORT ----- */

module.exports = new UserModel()

/* ---------- */