const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : { type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    avatar : {type: String, default: ''},
    status : {type: String, default: "offline"},
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }]
}, {timestamps: true})

const user = mongoose.model('User', userSchema)

module.exports = user