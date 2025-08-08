const router = require('express').Router()
const controller = require('../controllers/ProviderController')

router.get('/provider',controller.GetProviders)

module.exports = router