/* ----- REQUIRED IMPORTS ----- */

const controller = require("../controllers/event.controller")
const auth = require("../auth/auth")
const adminAuth = require("../auth/adminAuth")

const { Router } = require("express")

/* ---------- */

/* ----- VARIABLES ----- */

const router = Router()

/* ---------- */

/* ----- ROUTES ----- */

router.post("/", auth, adminAuth, controller.post)
router.get("/", controller.get)
router.put("/", auth, adminAuth, controller.update)

/* ---------- */

/* ----- ROUTER EXPORT ----- */

module.exports = router

/* ---------- */