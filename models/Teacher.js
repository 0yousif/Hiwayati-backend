const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
username: { type: String, required: true },
email: { type: String, required: true },
passwordDigest: { type: String, required: true },
  // image: { type: String, required: true },
bio: { type: String, required: true },
courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
Scheduel: [{type: mongoose.Schema.Types.ObjectId,ref: 'Event'}]
})

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher

