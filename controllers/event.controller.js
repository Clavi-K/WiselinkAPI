/* ----- REQUIRED IMPORTS ----- */

const service = require("../services/event.service")
const userService = require("../services/user.service")

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

        const { role } = req.user

        try {

            const events = await service.getAll(role)
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

    },

    getByUser: async (req, res) => {

        const { id } = req.user
        const { status } = req.params

        try {

            const events = await userService.getUserEvents(id, status)
            return res.status(200).send(events)

        } catch (e) {
            return res.status(500).send({ error: e.message || e })
        }

    },

    eventFilter: async (req, res) => {

        const filter = req.body
        const { role } = req.user

        try {

            const events = await service.eventFilter(role, filter)
            return res.status(200).send(events)

        } catch (e) {
            return res.status(500).send({ error: e.message || e })
        }

    },

    delete: async (req, res) => {

        const { eventId } = req.body

        try {

            await service.deleteEvent(eventId)
            return res.status(200).send({ msg: "Event successfully deleted!" })

        } catch(e) {
            return res.status(500).send({ error: e.message || e })
        }

    }

}

/* ---------- */
