/* ----- REQUIRED IMPORTS ----- */

const jwt = require("jsonwebtoken")
const config = require("../config/config")

/* ---------- */

/* ----- AUTH MIDDLEWARE EXPORT ----- */

module.exports = (req,res,next) => {

    const accessToken = req.headers["authorization"]
    console.log(req.headers)
    if(!accessToken) return res.status(403).send({error: "Access denied"})

    jwt.verify(accessToken, config.auth.SECRET, (err, user) => {

        if(err) {
            return res.status(403).send({error: "Access denied, invaild token"})
        } else {
            req.user = user
            next()
        }

    })

}

/* ---------- */