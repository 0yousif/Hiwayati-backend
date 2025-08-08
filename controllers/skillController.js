const { Skill } = require('../models')

const GetSkill = async (req, res) => {
  
  try {
    const skills = await Skill.find({})
  res.status(200).send(skills)
    
  } catch (error) {

    throw error
  }
}



module.exports = {
GetSkill

}