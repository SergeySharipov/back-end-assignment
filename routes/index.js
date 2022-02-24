const router = require('express').Router()
const pingRouter = require('./ping')

router.use('/api/ping', pingRouter)

module.exports = router