const router = require("express").Router()
const controller = require("../controllers/ProviderController")
const middleware = require("../middleware/index")

router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetProviders
)

router.get(
  "/:provider_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetProvider
)

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateProvider
)

router.put(
  "/:provider_id/edit",
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateProvider
)

router.delete(
  "/:provider_id/delete",
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteProvider
)

module.exports = router
