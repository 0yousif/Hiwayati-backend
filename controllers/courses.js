const Course = require("../models/course")

exports.courses_create_post =async (req,res) => {
    return res.send( await Course.create(req.body))
  }

exports.courseCtrl.courses_read_get = async (req,res)=>{
  res.send(await Course.find({}))
}