const router = require('express').Router()
const postsController = require('../controllers/postsController')

router.get('/', postsController.getPosts)

module.exports = router