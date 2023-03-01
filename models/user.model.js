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
            role: { type: String, default: "CLIENT" }
        })

        this.model = model("User", schema)

    }

    /* ----- USER MODEL METHODS ----- */

    async create(user) {
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(12))

        return await this.model.create(user)
    }

    async getById(userId) {
        return await this.model.findById(userId)
    }

    async getByEmail(email) {
        return await this.model.find({ email })
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

    /* ---------- */

}

/* ---------- */

/* ----- MODULE EXPORT ----- */

module.exports = new UserModel()

/* ---------- */