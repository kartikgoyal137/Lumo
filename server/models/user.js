const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : { type: string, required: true},
    email : {type: string, required: true, unique: true},
    password : {type: string, required: true},
    avatar : {type: string, default: ''},
    status : {type: string, default: "offline"},
}, {timestamps: true})

const user = mongoose.model('User', userSchema)

module.exports = user