/* ----- REQUIRED IMPORTS ----- */

const service = require("../services/user.service")

/* ---------- */

/* ----- CONTROLLER EXPORT ----- */

module.exports = {

    register: async (req, res) => {

        const user = req.body

        try {

            const result = await service.register(user)
            return res.status(201).send(result)

        } catch (e) {
            return res.status(500).send({ error: e.message || e })
        }


    },

    login: async(req,res) => {

        const {email, password } = req.body

        try {

            const result = await service.login(email, password)
            return res.status(200).send((result))

        } catch(e) {
            return res.status(500).send({ error: e.message || e })
        }

    }

}

/* ---------- */