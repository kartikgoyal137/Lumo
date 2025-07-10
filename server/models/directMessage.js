const mongoose = require('mongoose')

const dmSchema = new mongoose.Schema({
    sender : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    reciever : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    type: {type: String, enum:['text', 'image', 'file'], default: 'text'},
}, {timestamps: true})

const dm = mongoose.model('DM', dmSchema)

module.exports = dm