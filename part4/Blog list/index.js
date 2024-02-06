const app = require('./app')
const config = require('./Utils/config')
const logger = require('./Utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

