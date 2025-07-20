const {Router} = require('express')
const router = Router()
const User = require('../models/user.js')
const hash = require('../utils/hash.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
 
dotenv.config() 

const SECRET_KEY = process.env.SECRET_KEY
 
router.post('/signup', async (req, res) => { // signup
    const existing = await User.findOne({ email: req.body.email })
    if (existing) {
        return res.status(409).json({ error: 'User already exists' })
    }

    try {
        const { name, email } = req.body 
        const password = await hash(req.body.password)
        const newUser = new User({ name, email, password })
        await newUser.save()
        res.status(201).send('User created') 
    } catch (err) {
        res.status(500).json({ error: 'Error in updating database' }) 
    }
})

router.post('/auth', async (req, res) => { // login
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: 'User not found!' }) 
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password!' }) 
        }

        const userInfo = { email: user.email, id: user.id, name: user.name }
        const token = jwt.sign(userInfo, SECRET_KEY, { expiresIn: "10h" })

        return res.status(200).json({ token, userInfo }) // 200 OK
    } catch (err) {
        res.status(500).json({ error: 'Login failed due to server error' })
    }
})

module.exports = router
