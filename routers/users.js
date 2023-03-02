/* ----- REQUIRED IMPORTS ----- */

const controller = require("../controllers/user.controller")
const { Router } = require("express")
const auth = require("../auth/auth")

/* ---------- */

/* ----- VARIABLES ----- */

const router = Router()

/* ---------- */

/* ----- ROUTES ----- */

router.post("/register", controller.register)
router.post("/login", controller.login)
router.put("/addEvent", auth, controller.addEvent)

/* ---------- */

/* ----- ROUTER EXPORT ----- */

module.exports = router

/* ---------- */