const router = require("express").Router()
const courseCtrl = require("./../controllers/courses")
const middleware = require("./../middleware")

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.courses_create_post
)
router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.courses_readAll_get
)
router.post(
  "/enroll/:courseId",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.courses_enroll_post
)
router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.courses_readOne_get
)
router.put(
  "/:id/edit",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.courses_edit_put
)
router.delete(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.courses_delete_delete
)

// Comments

router.post(
  "/:id/messages",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.messages_create_post
)
router.get(
  "/:id/messages",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.messages_readAll_get
)
// router.delete("/:id/messages/:messageId", courseCtrl.messages_delete_delete)

module.exports = router
