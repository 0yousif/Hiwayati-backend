const { Skill } = require("../models")
const { param } = require("../routes/skillRouter")

const GetSkill = async (req, res) => {
  try {
    const skills = await Skill.find({})
    res.status(200).send(skills)
  } catch (error) {
    throw error
  }
}

const CreateSkill = async (req, res) => {
  try {
    const skill = await Skill.create({ ...req.body })
    res.status(200).send(skill)
  } catch (error) {
    throw error
  }
}

const UpdateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.skill_id, req.body, {
      new: true,
    })
    res.status(200).send(skill)
  } catch (error) {
    throw error
  }
}

const DeleteSkill = async (req,res) => {
  try {
    const skill = await Skill.deleteOne({_id: req.params.skill_id})
    res.status(200).send({msg:"Skill Deleted", payload: req.params.skill_id, status:'ok'})
  } catch (error) {
    throw error
    
  }
}

module.exports = {
  GetSkill,
  CreateSkill,
  UpdateSkill,
  DeleteSkill
}
