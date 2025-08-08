const router = require("express").Router()
const courseCtrl = require("./../controllers/courses")

router.post("/", courseCtrl.courses_create_post)
router.get("/", courseCtrl.courses_readAll_get)
router.get("/:id", courseCtrl.courses_readOne_get)
router.put("/:id/edit", courseCtrl.courses_edit_put)
router.delete("/:id",courseCtrl.courses_delete_delete)

// Comments

router.post("/:id/messages",courseCtrl.messages_create_post)
router.get("/:id/messages", courseCtrl.messages_readAll_get)
// router.delete("/:id/messages/:messageId", courseCtrl.messages_delete_delete)

module.exports = router