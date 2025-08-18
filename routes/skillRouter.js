const router = require("express").Router()
const controller = require("../controllers/skillController")
const middleware = require("../middleware/index")

router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetSkills
)

router.get(
  "/:skill_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetSkill
)

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateSkill
)

router.put(
  "/:skill_id/edit",
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateSkill
)

router.delete(
  "/:skill_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteSkill
)

module.exports = router
