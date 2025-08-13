const { Schema, default: mongoose } = require("mongoose")

const skillSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
})

module.exports = skillSchema
