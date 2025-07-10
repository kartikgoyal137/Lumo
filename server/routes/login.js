const {Router} = require('express')
const router = Router()
const User = require('../models/user.js')
const hash = require('../utils/hash.js')
const jwt = require('jsonwebtoken')

const KEY = process.env.SECRET_KEY




router.post('/signup', async (req,res) => { //signup
    try {
        const {name, email} = req.body
        const password = await hash(req.body.password)
        const newUser = new User({name, email, password})
        await newUser.save()
    }
    catch {
        res.send('error in updating database')
    }
})

router.post('/auth', async (req,res) => { //login
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!user){
            res.send('User not found!')
        }
        else if(!isMatch) {
            res.send('Incorrect password!')
        }

        const userInfo = {email : user.email, id : user._id, name : user.name}
        const token = jwt.sign(userInfo, KEY, {expiresIn: "1h"})

        res.json({token, userInfo})
    }
    catch (err) {
        res.send(err)
    }
})

module.exports = router