const { Server } = require('socket.io')
const http = require('http')

function initSocket(app) {
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', socket => {
    console.log('connected user with socket')

    socket.on('join-channel', roomId => {
      socket.join(roomId)
      console.log('channel joined')
    })

    socket.on('send-message', ({ channel_id, message }) => {
      socket.to(channel_id).emit('receive-message', message)
      console.log('message sent')
    })

    socket.on('disconnect', () => {
      console.log('user is disconnected from socket')
    })
  })

  return server
}

module.exports = initSocket
