const router = require('express').Router()
const controller = require('../controllers/ProviderController')

router.get('/provider',controller.GetProviders)
router.get('/provider/:provider_id',controller.GetProvider)

router.post('/provider',controller.CreateProvider)

module.exports = router