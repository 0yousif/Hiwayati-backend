const mongoose = require('mongoose')

const participantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  passwordDigest: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  currentCourses: {
    type: Array,
    required: true
  },

  previousCourses: {
    type: Array,
    required: true
  },
  Scheduel: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session'
    }
  ],

  skills: {
    type: Array,
    required: true
  }
})

const Participant = mongoose.model('Participant', participantSchema)

module.exports = Participant
