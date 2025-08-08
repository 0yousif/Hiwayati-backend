const { Schema } = require("mongoose")

const providerSchema = new Schema({
  name:{type:String},
  courses:{type:Array},
  location:{type:String}
})


module.exports = providerSchema
