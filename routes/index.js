const router = require('express').Router()
const pingRouter = require('./ping')
const postsRouter = require('./posts')

router.use('/api/ping', pingRouter)
router.use('/api/posts', postsRouter)

module.exports = router