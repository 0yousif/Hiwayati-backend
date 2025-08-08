const router = require("express").Router()
const participantCtrl = require('../controllers/participant')


router.get('/participant',participantCtrl.participant_signup_get)
router.post('/participant',participantCtrl.participant_signup_post)