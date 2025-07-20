const { Server } = require('socket.io')
const http = require('http')
const Message = require('../models/message.js')
const User = require('../models/user.js')

function initSocket(app) {
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: 'https://chatlumo.netlify.app',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', socket => {

    socket.on('join-channel', roomId => {
      socket.join(roomId)
    })

    socket.on('send-message', async ({sender, channel_id, message }) => {
      const user = await User.findById(sender)
      const name = user.name
      const newMessage = new Message({
      sender : sender,
      content: message ,
      channel: channel_id
      })
      const savedMessage = await newMessage.save()
      await savedMessage.populate('sender', 'name')
      io.to(channel_id).emit('receive-message', savedMessage)
    })

    socket.on('disconnect', () => {
    })
  })

  return server
}

module.exports = initSocket
