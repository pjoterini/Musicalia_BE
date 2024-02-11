require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const methodOverride = require('method-override')
const multer = require('multer')

const app = express()

// DATABASE
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to Mongoose'))

// MIDDLEWARE
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
  })
)
app.use(methodOverride('_method'))
app.use(express.static('public'))

// app.use(
//   express.urlencoded({ limit: '1mb', extended: false, parameterLimit: 10 })
// )
const storage = multer.memoryStorage()
const upload = multer({ storage })
app.use(upload.single('cover'))

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// ROUTES
app.use('/', require('./routes/index'))
app.use('/artists', require('./routes/artists'))
app.use('/songs', require('./routes/songs'))

app.listen(process.env.PORT || 3000, () => console.log('http://localhost:3000'))

exports.modules = {
  upload
}
