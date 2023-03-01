/* ----- ADMIN AUTH MIDDLEWARE EXPORT ----- */

module.exports = (req,res,next) => {

    if(!req.user) return res.status(403).send({error: "Access denied"})
    if(req.user.role !== "ADMIN") return res.status(403).send({error: "Access denied, admin role required"})

    next()

}

/* ---------- */