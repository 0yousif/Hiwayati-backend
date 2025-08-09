const router = require("express").Router()
const authCtrl = require('../controllers/auth')

router.post('/SignUp',authCtrl.SignUp)
router.post('/SignIn',authCtrl.SignIn)
router.put('/Edit/:id',authCtrl.Update,stripToken,verifyToken)
router.delete('/Delete/:id',authCtrl.Delete,stripToken,verifyToken)
router.get('/session',authCtrl.CheckSession,stripToken,verifyToken)
module.exports = router