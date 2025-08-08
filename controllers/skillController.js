const { Skill } = require("../models")

const GetSkill = async (req, res) => {
  try {
    const skills = await Skill.find({})
    res.status(200).send(skills)
  } catch (error) {
    throw error
  }
}

const CreateSkill = async(req,res) => {
  try {
    const skill = await Skill.create({...req.body})
    res.status(200).send(skill)

    
  } catch (error) {
    throw error
    
  }
}

const UpdateSkill = async (req, res) => {
  
}

module.exports = {
  GetSkill,
  CreateSkill
}
