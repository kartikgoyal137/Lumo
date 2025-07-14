const jwt = require('jsonwebtoken')
const KEY = process.env.SECRET_KEY

function verify(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token, KEY)
        req.user = user
        next()
    }
    catch (err) {
        res.send("error in verification!")
    }
}

module.exports = verify