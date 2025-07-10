const jwt = require('jsonwebtoken')
const KEY = process.env.SECRET_KEY

function verify(req, res, next) {
    try {
        const token = req.cookies.token
        const user = jwt.verify(token, KEY)
        next()
    }
    catch (err) {
        res.send("error in verification!")
    }
}

module.exports = verify