const router = require('express').Router()
const pingController = require('../controllers/pingController')

router.get('/', pingController.getPing)

module.exports = router