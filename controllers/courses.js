const Course = require("../models/course")
const Event = require("../models/Event")
const Participant = require("../models/Participant")
const Teacher = require("../models/Teacher")
const { getUser, getUserModel } = require("../middleware/")
const mongoose = require("mongoose")
const { join } = require("path")
const { endianness } = require("os")
exports.courses_create_post = async (req, res) => {
  const user = await getUser(res.locals.payload.id)
  if (!user.currentCourses) {
    req.body.teacher = res.locals.payload.id
    const newCourse = await Course.create(req.body)
    user.courses.push(newCourse._id)
    await user.save()
    res.send()
  } else {
    return res.send("This user is not a teacher")
  }
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

exports.message_delete_delete = async (req, res) => {
  const course = await Course.findById(req.params.id)
  const message = course.messages.find(
    (message) => message._id.toString() === req.params.messageId
  )
  if (message.userId.toString() === res.locals.payload.id.toString()) {
    await Course.findByIdAndUpdate(req.params.id, {
      $pull: { messages: { _id: req.params.messageId } },
    })
  }
  res.send(message)
}


exports.message_update_put = async (req,res)=>{
  
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
    const joinedParticipants = await Participant.find({
      "currentCourses.course": { $in: [courseId] },
    })

    joinedParticipants.forEach((joinedParticipant) => {
      let endedCourseIndex
      let endedCourse = joinedParticipant.currentCourses.find(
        (currentCourse, index) => {
          if (currentCourse.course.toString() === courseId.toString()) {
            endedCourseIndex = index
            return true
          }
        }
      )

      joinedParticipant.currentCourses.splice(endedCourseIndex, 1)
      joinedParticipant.previousCourses.push({
        course: endedCourse.course,
        hours: endedCourse.hours,
      })
      joinedParticipant.save()
    })

    course.state = "done"
    await course.save()
    return res.send({ course, joinedParticipants })
  } else {
    return res.status(400).send("You are not the course owner")
  }
}

exports.courses_enroll_post = async (req, res) => {
  const user = await getUser(res.locals.payload.id)
  if (user.currentCourses) {
    const course = await Course.findById(req.params.id)
    if (
      user.currentCourses.some(
        (currentCourse) =>
          currentCourse.course.toString() === course._id.toString()
      )
    ) {
      return res.status(400).send("This user is already enrolled")
    } else {
      return await res.send(
        await Participant.findByIdAndUpdate(res.locals.payload.id, {
          $push: {
            currentCourses: { course: course._id },
            skills: course.skills,
          },
        })
      )
    }
  } else {
    return res.status(400).send("This is a teacher account")
  }
}
