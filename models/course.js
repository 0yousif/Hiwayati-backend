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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  messages: [
    {
      userType: {
        type: String,
        required: true,
        enum: ["Participant", "Teacher"],
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      
    },
  ],
  events:[{type : mongoose.Schema.Types.ObjectId, ref: 'Event'}]
      
})

const Course = mongoose.model("Course", courseSchema)

module.exports = Course

