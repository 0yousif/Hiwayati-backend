const router = require("express").Router()
const authCtrl = require("../controllers/auth")
const middleware = require("../middleware/index")

router.post("/SignUp", authCtrl.auth_signUp_post)

router.post("/SignIn", authCtrl.auth_signIn_post)

router.put(
  "/Edit/:id",
  middleware.stripToken,
  middleware.verifyToken,
  authCtrl.auth_update_put
)

router.delete(
  "/Delete/:id",
  middleware.stripToken,
  middleware.verifyToken,
  authCtrl.auth_delete_delete
)

router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  authCtrl.CheckSession
)

router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  authCtrl.auth_profile_get
)

module.exports = router
