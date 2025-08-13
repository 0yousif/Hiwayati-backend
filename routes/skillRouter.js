const router = require("express").Router()
const controller = require("../controllers/skillController")

router.get("/", controller.GetSkills)
router.get("/:skill_id", controller.GetSkill)

router.post("/", controller.CreateSkill)
router.put("/:skill_id/edit", controller.UpdateSkill)

router.delete("/:skill_id", controller.DeleteSkill)

module.exports = router
