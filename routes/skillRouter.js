const router = require('express').Router()
const controller = require('../controllers/skillController')

router.get('/skill',controller.GetSkills)
router.get('/skill/:skill_id',controller.GetSkill)

router.post('/skill',controller.CreateSkill)
router.put('/skill/:skill_id/edit',controller.UpdateSkill)

router.delete('/skill/:skill_id/delete',controller.DeleteSkill)

module.exports = router