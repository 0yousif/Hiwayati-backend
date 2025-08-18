const { Schema } = require("mongoose")

const providerSchema = new Schema({
  name: { type: String, required: true },
  courses: { type: Array, required: true },
  location: { type: String, required: true },
})

module.exports = providerSchema
