const router = require('express').Router()
const controller = require('../controllers/skillController')

router.get('/skill',controller.GetSkill)

router.post('/skill',controller.CreateSkill)

module.exports = router