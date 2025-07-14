const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    channel : {type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true},
    content: {type: String, required: true},
    type: {type: String, enum:['text', 'image', 'file'], default: 'text'}
}, {timestamps: true})

const message = mongoose.model('Message', messageSchema)

module.exports = message 