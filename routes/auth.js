const router = require("express").Router()
const participantCtrl = require('../controllers/auth')

router.post('/SignUp',participantCtrl.SignUp)
router.post('/SignIn',participantCtrl.SignIn)
 
module.exports = router