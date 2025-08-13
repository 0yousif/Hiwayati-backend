const Course = require("../models/course")
const Event = require("../models/Event")
const Participant = require("../models/Participant")
const Teacher = require("../models/Teacher")
const { getUser, getUserModel } = require("../middleware/")
const mongoose = require("mongoose")
const { join } = require("path")
exports.courses_create_post = async (req, res) => {
  req.body.teacher = res.locals.payload.id
  return res.send(await Course.create(req.body))
}

exports.courses_readAll_get = async (req, res) => {
  const response = await Course.find({}).populate([
    { path: "skills" },
    { path: "provider" },
    { path: "events" },
    { path: "teacher" },
  ])
  res.send(response)
}

exports.courses_readOne_get = async (req, res) => {
  if (await Course.findById(req.params.id)) {
    return res.send(
      await Course.findById(req.params.id).populate([
        { path: "skills" },
        { path: "provider" },
        { path: "events" },
        { path: "teacher" },
      ])
    )
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
  await Course.findByIdAndUpdate(req.params.id, {
    $pull: { events: req.params.eventId },
  })

  await Event.findByIdAndDelete(req.params.eventId)

  return res.send("delete")
}

exports.courses_end_post = async (req, res) => {
  const course = await Course.findById(req.params.id)
  if (course.teacher._id.toString() === res.locals.payload.id.toString()) {
    const courseId = (await Course.findById(req.params.id))._id
    console.log(courseId)
    const joinedParticipants = await Participant.find({
      "currentCourses.course": { $in: [courseId] },
    })


    res.send(joinedParticipants)

    // await course.save()
  }
}

exports.courses_enroll_post = async (req, res) => {
  const user = await getUser(res.locals.payload.id)
  if (user.currentCourses) {
    const courseId = (await Course.findById(req.params.id))._id
    if (user.currentCourses.some(currentCourse => currentCourse.course.toString() === courseId._id.toString())) {
      return res.send("This user is already enrolled")
    } else {
      // await res.send(
      //   await Participant.findByIdAndUpdate(res.locals.payload.id, {
      //     $push: {
      //       currentCourses: {course: courseId},
      //     },
      //   })
      // )
      res.send()
    }
  } else {
    return res.send("This is a teacher account")
  }
}
