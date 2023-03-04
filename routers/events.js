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
router.post("/eventFilter", auth, controller.eventFilter)

router.delete("/", auth, adminAuth, controller.delete)

router.put("/", auth, adminAuth, controller.update)

router.get("/", auth, controller.get)
router.get("/getByUser/:status", auth, controller.getByUser)

/* ---------- */

/* ----- ROUTER EXPORT ----- */

module.exports = router

/* ---------- */