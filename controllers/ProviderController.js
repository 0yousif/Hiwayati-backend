const { Provider } = require("../models")

const GetProviders = async (req, res) => {
  try {
    const provider = await Provider.find({})
    res.status(200).send(provider)
  } catch (error) {
    throw error
  }
}

const GetProvider = async (req,res) => {
  try {
    const provider = await Provider.findById(req.params.provider_id)
    res.status(200).send(provider)
  } catch (error) {
    throw error
    
  }
}

const CreateProvider = async (req,res) => {
  try {
    const provider = await Provider.create({... req.body})
    res.status(200).send(provider)
  } catch (error) {
    throw error
    
  }

}



module.exports = {
  GetProviders,
  GetProvider,
  CreateProvider
}
