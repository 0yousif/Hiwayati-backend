const Course = require("../models/course")
const Event = require("../models/Event")
const Participant = require("../models/Participant")
const Teacher = require("../models/Teacher")
const { getUser, getUserModel } = require("../middleware/")

exports.courses_create_post = async (req, res) => {
  req.body.teacher = res.locals.payload.id
  return res.send(await Course.create(req.body))
}

exports.courses_readAll_get = async (req, res) => {
  const response = await Course.find({}).populate([{path:'skills'},{path:'provider'},{path:'events'},{path:'teacher'}])
  res.send(response)
}

exports.courses_readOne_get = async (req, res) => {
  if (await Course.findById(req.params.id)) {
    return res.send(await Course.findById(req.params.id).populate([{path:'skills'},{path:'provider'},{path:'events'},{path:'teacher'}]))
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

exports.courses_enroll_post = async (req, res) => {
  if (await getUser(res.locals.payload.id)) {
    const user = await getUser(res.locals.payload.id)
    if (user.currentCourses) {
      // which means the use is a Participant
      user.currentCourses.push({ course: req.params.courseId, hours: 0 })
      await user.save()
    } else {
      console.log("here")
      const courses = user.courses

      courses.push({
        course: req.params.courseId,
        hours: 0,
      })
      user.save()
      console.log(user.courses)
    }
  } else {
    return res.send("Not found")
  }
}

exports.messages_create_post = async (req, res) => {
  if (await Course.findById(req.params.id)) {
    await Course.findByIdAndUpdate(req.params.id, {
      $push: {
        messages: {
          userType: await getUserModel(res.locals.payload.id),
          userId: res.locals.payload.id,
          content: req.body.content,
        },
      },
    })
    res.send(
      "comment created" +
        JSON.stringify({
          userType: await getUserModel(res.locals.payload.id),
          userId: res.locals.payload.id,
          content: req.body.content,
        })
    )
  } else return res.send("not found")
}

exports.messages_readAll_get = async (req, res) => {
  if (await Course.findById(req.params.id)) {
    const course = await Course.findById(req.params.id).populate({
      path: "messages",
      populate: {
        path: "userId",
        model: this.userType,
      },
    })

    res.send(course.messages)
  } else return res.send("not found")
}

exports.event_create_post = async (req, res) => {
  const newEvent = await Event.create(req.body)
  await Course.findByIdAndUpdate(req.params.id, {
    $push: { events: newEvent.id },
  })
  res.send(newEvent)
}
exports.event_readOne_get = async (req, res) => {
  const event = await Event.findById(req.params.eventId)
  return res.send(event)
}

exports.event_deleteOne_delete = async (req, res) => {
    
  await Course.findByIdAndUpdate(req.params.id,{$pull:{events : req.params.eventId }})

  await Event.findByIdAndDelete(req.params.eventId)

  return res.send('delete')
}
