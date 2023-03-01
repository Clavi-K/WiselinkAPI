/* ----- REQUIRED IMPORTS ----- */

const service = require("../services/event.service")

/* ---------- */

/* ----- CONTROLLER EXPORT ----- */

module.exports = {

    post: async (req, res) => {

        const event = req.body

        try {

            const result = await service.create(event)
            return res.status(201).send(result)

        } catch (e) {
            return res.status(500).send({ error: e.message || e })
        }

    },

    get: async (req, res) => {

        try {

            const events = await service.getAll()
            return res.status(200).send(events)

        } catch (e) {
            return res.status(500).send({ error: e.message || e })
        }

    },

    update: async (req, res) => {

        const { eventId, newEvent } = req.body

        try {

            const updatedEvent = await service.update(eventId, newEvent)
            return res.status(200).send(updatedEvent)

        } catch (e) {
            return res.status(500).send({ error: e.message || e })
        }

    }

}

/* ---------- */
