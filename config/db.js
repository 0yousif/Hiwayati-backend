const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on("connected", () => {
  console.log(`connected to Database: ${mongoose.connection.name}`)
})

module.exports = mongoose
