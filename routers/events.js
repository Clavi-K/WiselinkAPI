/* ----- REQUIRED IMPORTS ----- */

const controller = require("../controllers/event.controller")
const { Router } = require("express")

/* ---------- */

/* ----- VARIABLES ----- */

const router = Router()

/* ---------- */

/* ----- ROUTES ----- */

router.post("/", controller.post)
router.get("/", controller.get)
router.put("/", controller.update)

/* ---------- */

/* ----- ROUTER EXPORT ----- */

module.exports = router

/* ---------- */