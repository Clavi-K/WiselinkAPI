/* ----- REQUIRED IMPORTS ----- */

const controller = require("../controllers/user.controller")
const { Router } = require("express")

/* ---------- */

/* ----- VARIABLES ----- */

const router = Router()

/* ---------- */

/* ----- ROUTES ----- */

router.post("/", controller.post)
router.post("/login", controller.login)

/* ---------- */

/* ----- ROUTER EXPORT ----- */

module.exports = router

/* ---------- */