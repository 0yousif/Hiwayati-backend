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
      type: mongoose.Schema.Types.ObjectId, ref:'Event'
    }
  ],

  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
})

const Participant = mongoose.model("Participant", participantSchema)

module.exports = Participant
