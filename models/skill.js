const { Schema, default: mongoose } = require("mongoose")

const skillSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  courses: { type: mongoose.Schema.Types.ObjectId,ref:'Course', required: true },
})

module.exports = skillSchema
