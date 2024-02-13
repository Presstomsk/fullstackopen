const config = require('./Utils/config.js')
const express = require('express')
require('express-async-errors')
const logger = require('./Utils/logger.js')
const middleware = require('./Utils/middleware.js')
const app = express()
const cors = require('cors')
const blogsRouter = require('./Controllers/blogs.js')
const usersRouter = require('./Controllers/users.js')
const loginRouter = require('./Controllers/login.js')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(result => {logger.info('connected to MongoDB')})
  .catch((error) => {logger.error('error connecting to MongoDB:', error.message)})

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app