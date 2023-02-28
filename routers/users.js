/* ----- REQUIRED IMPORTS ----- */

const controller = require("../controllers/user.controller")
const { Router } = require("express")

/* ---------- */

/* ----- VARIABLES ----- */

const router = Router()

/* ---------- */

/* ----- ROUTES ----- */

router.post("/", controller.post)

/* ---------- */

/* ----- ROUTER EXPORT ----- */

module.exports = router

/* ---------- */