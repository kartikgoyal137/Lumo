const {Router} = require('express')
const Channel = require('../models/channel.js')
const allChannel = require('../controllers/allChannel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = Router()
const verify = require('../middleware/verifyToken.js')

const SECRET_KEY = process.env.SECRET_KEY


//add member, remove member, create channel, get channel data, get specific channel data




router.get('/:user_id/:num', async (req,res) => {
    const userId = req.params.user_id
    const num = Number(req.params.num)
    
    try {
        if(userId === 0){
        return res.json(allChannel());
        }
        const exploreList = await Channel.find({ members: { $ne: userId } })
        const myList = await Channel.find({members : userId})
        if(num===1){
            return res.json(myList)
        }
        else {
            return res.json(exploreList)
        }
        
    }  catch (err) {
    console.error('Failed to fetch channels:', err)
    res.status(500).json({ error: 'Server error' })
    }
})

router.post('/:user_id/create', verify, async (req,res) => {
    const {name, description} = req.body
    const userid = req.params.user_id
    const newChannel = new Channel({name, description, members:[userid], admins:[userid], createdBy:userid })
    await newChannel.save()
    res.send('Channel Created')
})

router.post('/:user_id/join', verify, async (req,res) => {
    const userid = req.params.user_id
    const channelid = req.body.channel_id

    const channel = await Channel.findById(channelid)
    channel.members.push(userid)
    await channel.save()
    res.send('added channel successfully!')
})

router.post('/:user_id/leave', verify, async (req,res) => {
    const userid = req.params.user_id
    const channelid = req.body.channel_id

    const channel = await Channel.findById(channelid)
    channel.members = channel.members.filter((ele) => {
        ele.toString() != userid
    })
    await channel.save()
    res.send('left channel successfully!')
})

module.exports = router