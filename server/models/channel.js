const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    name : { type: String, required: true},
    description: {type: String},
    members : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    admins : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

channelSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

const channel = mongoose.model('Channel', channelSchema)

module.exports = channel