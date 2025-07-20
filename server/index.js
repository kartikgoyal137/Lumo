const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const initSocket = require('./utils/socket.js')

const loginRouter = require('./routes/login.js')
const channelRouter = require('./routes/channel.js')

dotenv.config()
const app = express()
app.use(cors({ origin: "https://chatlumo.netlify.app", credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] }))
app.use(express.json())


app.use('/api/login', loginRouter)
app.use('/api/channel', channelRouter)

mongoose.connect(process.env.MONGO_URI).then(
  () => {console.log('MongoDB connected!')} 
).catch(err => {console.error('MongoDB connection error!', err)})
 
const server = initSocket(app)


app.get('/', (req, res) => {
  res.send('Lumo backend is running!')
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
})

module.exports = app