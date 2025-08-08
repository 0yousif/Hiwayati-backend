const router = require('express').Router()
const controller = require('../controllers/ProviderController')

router.get('/provider',controller.GetProviders)
router.get('/provider/provider_id',controller.GetProvider)

module.exports = router