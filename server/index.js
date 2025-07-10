const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(
  () => {console.log('MongoDB connected!')}
).catch(err => {console.error('MongoDB connection error!', err)})

app.get('/', (req, res) => {
  res.send('Lumo backend is running!')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})