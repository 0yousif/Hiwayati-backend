const router = require('express').Router()
const controller = require('../controllers/skillController')

router.get('/skill',controller.GetSkill)

module.exports = router