const router = require('express').Router()
const controller = require('../controllers/skillController')

router.get('/skill',controller.GetSkill)

router.post('/skill',controller.CreateSkill)
router.put('/skill/:skill_id',controller.UpdateSkill)

module.exports = router