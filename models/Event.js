const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      time_date: { type: String, required: true },
      courses_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }
    })

    const Event = mongoose.model('Event', eventSchema)
    
    module.exports = Event