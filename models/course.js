const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  provider: {
    type: mongoose.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Skill",
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  messages: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        refPath: "messages.userType",
      },
      userType: {
        type: String,
        required: true,
        enum: ["Participant", "Teacher"],
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
})

const Course = mongoose.model("Course", courseSchema)

module.exports = Course
