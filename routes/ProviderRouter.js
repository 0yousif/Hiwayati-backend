const router = require('express').Router()
const controller = require('../controllers/ProviderController')

router.get('/provider',controller.GetProviders)
router.get('/provider/:provider_id',controller.GetProvider)

router.post('/provider',controller.CreateProvider)
router.put('/provider/:provider_id/edit',controller.UpdateProvider)

router.delete('/provider/:provider_id/delete',controller.DeleteProvider)

module.exports = router