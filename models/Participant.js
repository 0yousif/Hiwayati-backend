const mongoose = require("mongoose")

const participantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  passwordDigest: {
    type: String,
    required: true,
  },

  // age: {
  //   type: Number,
  //   required: true
  // },

  // image: {
  //   type: String,
  //   required: true
  // },

  currentCourses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      hours: { type: Number, default: 0 },
    },
  ],

  previousCourses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      hours: { type: Number, default: 0 },
    },
  ],
  Scheduel: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      time_date: { type: String, required: true },
      courses_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      place_id: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
    },
  ],

  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
})

const Participant = mongoose.model("Participant", participantSchema)

module.exports = Participant
