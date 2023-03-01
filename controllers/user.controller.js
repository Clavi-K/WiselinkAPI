/* ----- REQUIRED IMPORTS ----- */

const service = require("../services/user.service")

/* ---------- */

/* ----- CONTROLLER EXPORT ----- */

module.exports = {

    post: async (req, res) => {

        const user = req.body

        try {

            const result = await service.post(user)
            return res.status(201).send(result)

        } catch (e) {
            return res.status(500).send({ error: e.message || e })
        }


    }

}

/* ---------- */