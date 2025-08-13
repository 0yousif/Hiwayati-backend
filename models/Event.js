const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  courses_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  place_id: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
})

const Event = mongoose.model("Event", eventSchema)
// 00:00
// 2023-12-9
module.exports = Event
