const mongoose = require('mongoose')

const participantSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordDigest: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },
  currentCourses: { typey: Array, required: true },
  previousCourses: { typey: Array, required: true },
  Scheduel: [
    { name: { type: String, required: true } }, 
    { description: { type: String, required: true } },
    { time_date: { type: String, required: true } },
    { courses_id: { type: Schema.Types.ObjectId, ref: 'Course' } },
    { place_id: { type: Schema.Types.ObjectId, ref: 'Provider' } }
  ],
  skills: { typey: Array, required: true }
})

const Participant = mongoose.model('Participant',participantSchema)

module.exports = Participant