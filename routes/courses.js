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

router.post(
  "/:id/end",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.courses_end_post
)
router.post(
  "/:id/enroll",
  middleware.stripToken,
  middleware.verifyToken,
  courseCtrl.courses_enroll_post
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

router.post('/:id/event/',courseCtrl.event_create_post)
router.get('/:id/event/:eventId',courseCtrl.event_readOne_get)
router.delete('/:id/event/remove/:eventId',courseCtrl.event_deleteOne_delete)

module.exports = router
