const {Router} = require('express')
const Channel = require('../models/channel.js')
const allChannel = require('../controllers/allChannel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = Router()
const verify = require('../middleware/verifyToken.js')
const Message = require('../models/message.js')

const SECRET_KEY = process.env.SECRET_KEY

router.get('/info/:id', verify, async (req,res) => {
    const cID = req.params.id
    try {
        const currChannel = await Channel.findById(cID)
        if (!currChannel) {
            return res.status(404).json({ error: 'Channel not found' })
        }
        res.status(200).json({ info : currChannel })
    } catch (err) {
        console.error('Failed to fetch channel:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.get('/message/:id', verify, async (req, res) => {
  try {
    const messages = await Message.find({ channel: req.params.id }).populate('sender', 'name')
    res.status(200).json({ info: messages })
  } catch (err) {
    console.error('Failed to fetch messages:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/members/:id', verify, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate('members', 'name')
    if (!channel) {
        return res.status(404).json({ error: 'Channel not found' })
    }
    res.status(200).json({ info: channel })
  } catch (err) {
    console.error('Failed to fetch members:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:user_id/:num', verify, async (req, res) => {
    const userId = req.params.user_id
    const num = Number(req.params.num)
    try {
        if(userId === 0){
            return res.status(200).json(allChannel())
        }
        const exploreList = await Channel.find({ members: { $ne: userId } })
        const myList = await Channel.find({ members: userId })
        if(num === 1){
            return res.status(200).json(myList)
        } else {
            return res.status(200).json(exploreList)
        }
    } catch (err) {
        console.error('Failed to fetch channels:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.post('/:user_id/create', verify, async (req, res) => {
    try {
        const { name, description } = req.body
        const userid = req.params.user_id
        const oldChannel = await Channel.findOne({ name })
        if (oldChannel) {
            return res.status(409).json({ error: "Channel already exists" })
        }
        const newChannel = new Channel({
            name,
            description,
            members: [userid],
            admins: [userid],
            createdBy: userid
        })
        await newChannel.save()
        res.status(201).send('Channel Created')
    } catch (err) {
        console.error('Failed to create channel:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.post('/:user_id/join', verify, async (req, res) => {
    try {
        const userid = req.params.user_id
        const channelid = req.body.channel_id
        const channel = await Channel.findById(channelid)
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found' })
        }
        if (channel.members.includes(userid)) {
            return res.status(400).json({ error: 'User already a member' })
        }
        channel.members.push(userid)
        await channel.save()
        res.status(200).send('Added channel successfully!')
    } catch (err) {
        console.error('Failed to join channel:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.post('/:user_id/leave', verify, async (req, res) => {
    try {
        const userid = req.params.user_id
        const channelid = req.body.channel_id
        const channel = await Channel.findById(channelid)
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found' })
        }
        const array = channel.members.filter(ele => ele.toString() !== userid.toString())
        channel.members = array
        await channel.save()
        res.status(200).send('Left channel successfully!')
    } catch (err) {
        console.error('Failed to leave channel:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router
