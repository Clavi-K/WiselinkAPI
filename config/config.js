
/* ----- MODULE EXPORT ----- */

module.exports = {

    atlas: {
        SCHEMA: process.env.ATLASSCHEMA,
        USER: process.env.ATLASUSER,
        PASSWORD: process.env.ATLASPASSWORD,
        DATABASE: process.env.ATLASDATABASE,
        OPTIONS: process.env.ATLASOPTIONS,
        HOSTNAME: process.env.ATLASHOSTNAME
    },

    auth: {
        SECRET: process.env.AUTHSECRET
    }

}

/* ---------- */