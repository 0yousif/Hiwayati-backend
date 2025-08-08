const router = require("express").Router()
const participantCtrl = require('../controllers/participant')

router.post('/SignUp',participantCtrl.SignUp)

module.exports = router