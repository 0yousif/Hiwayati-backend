const Course = require("../models/course")

exports.courses_create_post = async (req, res) => {
  return res.send(await Course.create(req.body))
}

exports.courses_readAll_get = async (req, res) => {
  res.send(await Course.find({}))
}

exports.courses_readOne_get = async (req, res) => {
  if (await Course.findById(req.params.id)) {
    return res.send(await Course.findById(req.params.id))
  } else {
    return res.send("not found")
  }
}

exports.courses_edit_put = async (req, res) => {
  if (await Course.findById(req.params.id)) {
    await Course.findByIdAndUpdate(req.params.id, req.body)
    return res.send(await Course.findById(req.params.id))
  } else {
    return res.send("not found")
  }
}

exports.courses_delete_delete = async (req, res) => {
  if (await Course.findById(req.params.id)) {
    await Course.findByIdAndDelete(req.params.id)
    return res.send("Course Deleted")
  } else return res.send("not found")
}

exports.messages_create_post = async (req, res) => {
  if (await Course.findById(req.params.id)) {
    await Course.findByIdAndUpdate(req.params.id, {
      $push: {
        messages: {
          userType: req.body.userType,
          userId: "6895da05ba52465217424480", // this should be taken from the user session later on
          content: req.body.content,
        },
      },
    })
    res.send("comment created")
  } else return res.send("not found")
}

exports.messages_readAll_get = async (req, res) => {
  if (await Course.findById(req.params.id)) {
    const course = await Course.findById(req.params.id)
    res.send(course.messages)
  } else return res.send("not found")
}

exports.messages_readAll_get = async (req, res) => {
  if (await Course.findById(req.params.id)) {
    const course = await Course.findById(req.params.id)
    res.send(course.messages)
  } else return res.send("not found")
}
