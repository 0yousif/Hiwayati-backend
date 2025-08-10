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
    const providers = await Provider.findById(req.params.provider_id)
    res.status(200).send(providers)
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

const UpdateProvider = async (req,res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.provider_id,req.body, {new:true})
    res.status(200).send(provider)
  } catch (error) {
    throw error
    
  }
}

const DeleteProvider = async (req,res) => {
  try {
    const provider = await Provider.deleteOne({_id: req.params.provider_id})
    res.status(200).send({msg:"Provider Deleted", payload: req.params.provider_id, status:"Ok"})
  } catch (error) {
    throw error
  }
}


module.exports = {
  GetProviders,
  GetProvider,
  CreateProvider,
  UpdateProvider,
  DeleteProvider
}
