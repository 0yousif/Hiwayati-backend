const router = require("express").Router()
const participantCtrl = require('../controllers/participant')

router.post('/SignUp',participantCtrl.SignUp)
router.post('/SignIn',participantCtrl.SignIn)
 
module.exports = router