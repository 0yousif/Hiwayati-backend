const { Skill } = require("../models")
const Course = require("../models/course")

const skill_readAll_get = async (req, res) => {
  try {
    const skills = await Skill.find({})
    res.status(200).send(skills)
  } catch (error) {
    throw error
  }
}

const skill_readOne_get = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.skill_id)
    res.status(200).send(skill)
  } catch (error) {
    throw error
  }
}

const skill_create_post = async (req, res) => {
  try {
    const skill = await Skill.create({ ...req.body })
    res.status(200).send(skill)
  } catch (error) {
    throw error
  }
}

const skill_update_put = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.skill_id, req.body, {
      new: true,
    })
    res.status(200).send(skill)
  } catch (error) {
    throw error
  }
}

const skill_delete_delete = async (req, res) => {
  try {
    const skill = await Skill.deleteOne({ _id: req.params.skill_id })
    res.status(200).send({
      msg: "Skill Deleted",
      payload: req.params.skill_id,
      status: "ok",
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  skill_readOne_get,
  skill_readAll_get,
  skill_create_post,
  skill_update_put,
  skill_delete_delete,
}
