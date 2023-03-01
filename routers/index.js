/* ----- REQUIRED IMPORTS ----- */

const { Router } = require("express")
const fs = require("fs")

/* ---------- */

/* ----- VARIABLES ----- */

const router = Router()
const pathRouter = `${__dirname}`

/* ---------- */

/* ----- ROUTERS IMPLEMENTATION ----- */

const cleanFileName = (fileName) => {
    const file = fileName.split(".").shift();
    return file;
};

fs.readdirSync(pathRouter).filter((file) => {
    const cleanName = cleanFileName(file);
    const filesSkipped = ["index", "public"].includes(cleanName);
    if (!filesSkipped) {
        router.use(`/${cleanName}`, require(`./${cleanName}`));
    }
});

router.get("*", (req, res) => {
    res.status(404);
    res.send({
        error: "Not eFound",
    });
});

/* ---------- */

/* ----- ROUTER EXPORT ----- */

module.exports = router

/* ---------- */