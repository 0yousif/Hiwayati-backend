const router = require("express").Router()
const authCtrl = require('../controllers/auth')
const middleware = require('../middleware/index')

router.post('/SignUp',authCtrl.SignUp)
router.post('/SignIn',authCtrl.SignIn)
router.put('/Edit/:id',middleware.stripToken,middleware.verifyToken,authCtrl.Update)
router.delete('/Delete/:id',middleware.stripToken,middleware.verifyToken,authCtrl.Delete)
router.get('/session',middleware.stripToken,middleware.verifyToken,authCtrl.CheckSession)
module.exports = router