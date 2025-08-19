const router = require("express").Router()
const controller = require("../controllers/skillController")
const middleware = require("../middleware/index")

router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.skill_readAll_get
)

router.get(
  "/:skill_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.skill_readOne_get
)

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.skill_create_post
)

router.put(
  "/:skill_id/edit",
  middleware.stripToken,
  middleware.verifyToken,
  controller.skill_update_put
)

router.delete(
  "/:skill_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.skill_delete_delete
)

module.exports = router
