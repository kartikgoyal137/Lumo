const Channel = require('../models/channel.js')

const func = async () => {
    const channelList = await Channel.find()
    return channelList
}

module.exports = func