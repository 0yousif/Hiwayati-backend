const { Schema } = require("mongoose")

const skillSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  courses: { type: Array, require: true },
})

module.exports = skillSchema
