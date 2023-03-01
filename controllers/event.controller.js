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

    }

}

/* ---------- */
