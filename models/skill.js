const { Schema } = require("mongoose")

const skillSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  courses: { type: Array, required: true },
})

module.exports = skillSchema
