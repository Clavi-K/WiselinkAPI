/* ----- ENVIROMENT VARIABLES CONFIG ----- */

require("dotenv").config({ path: ".env" })

/* ---------- */

/* ------ REQUIRED IMPORTS ----- */

const express = require("express")
const mongoose = require("mongoose")

const config = require("./config/config")
const routers = require("./routers")

/* ---------- */

/* ----- VARIABLES ----- */

const PORT = process.env.PORT || 8082

/* ---------- */

/* ----- APP INITIALIZATION ----- */

const app = express()

/* ---------- */

/* ----- DATABASE CONNECTION ----- */

mongoose.connect(
    `${config.atlas.SCHEMA}://${config.atlas.USER}:${config.atlas.PASSWORD}@${config.atlas.HOSTNAME}/${config.atlas.DATABASE}?${config.atlas.OPTIONS}`
)
    .then(() => {

        /* ----- MIDDLEWARES ----- */

        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        /* ---------- */

        /* ----- HEADERS ----- */

        app.use((_, res, next) => {

            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header("Access-Control-Allow-Credentials", 'true');
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

            next();
        })

        /* ---------- */

        /* ----- ROUTERS ----- */

        app.use("/", routers)

        /* ---------- */

        /* ----- APP LISTENING ----- */

        app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

        /* ---------- */
    })

/* ---------- */