const { Schema } = require('mongoose')

const teacherSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordDigest: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  Scheduel: [
    { name: { type: String, required: true } },
    { description: { type: String, required: true } },
    { time_date: { type: String, required: true } },
    { courses_id: { type: Schema.Types.ObjectId, ref: 'Course' } },
    { place_id: { type: Schema.Types.ObjectId, ref: 'Provider' } }
  ]
})

module.exports = teacherSchema
