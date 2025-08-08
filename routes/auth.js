const router = require("express").Router()
const authCtrl = require('../controllers/auth')

router.post('/SignUp',authCtrl.SignUp)
router.post('/SignIn',authCtrl.SignIn)
router.put('/Edit/:id',authCtrl.Update)
module.exports = router