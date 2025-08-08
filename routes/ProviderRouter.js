const router = require("express").Router()
const controller = require("../controllers/ProviderController")

router.get("/", controller.GetProviders)
router.get("/:provider_id", controller.GetProvider)

router.post("/", controller.CreateProvider)
router.put("/:provider_id/edit", controller.UpdateProvider)

router.delete("/:provider_id/delete", controller.DeleteProvider)

module.exports = router
