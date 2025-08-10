const Course = require("../models/course")
const Event = require("../models/Event")
const Participant = require("../models/Participant")
const Teacher = require("../models/Teacher")
const { getUser } = require("../middleware/")

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

exports.courses_enroll_post = async (req, res) => {
  if (await getUser(res.locals.payload.id)) {
    const user = await getUser(res.locals.payload.id)
    if (user.currentCourses) {
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
          userType: req.body.userType,
          userId: res.locals.payload.id, // this should be taken from the user session later on
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

exports.event_create_post= async (req,res)=>{
  const newEvent= await Event.create(req.body)
  await Event.findByIdAndUpdate(req.params.id,{$push:{events : newEvent._id }})
  res.send(newEvent)
}


// exports.event_deleteOne_delete = async (req, res) => {
//   await Event.findByIdAndUpdate(req.params.id,{$pull:{events : req.params.eventId}})
// }
