const mongoose = require("mongoose")

//Jawad
const skillSchema = require("./skill")
const providerSchema = require("./provider")

const Skill = mongoose.model("Skill", skillSchema)
const Provider = mongoose.model("Provider", providerSchema)

module.exports = {
  Skill,
  Provider,
}
