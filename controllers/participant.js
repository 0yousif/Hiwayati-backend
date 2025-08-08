const Participant =require('../models/Participant')
const middleware = require('../middleware/index')



exports.SignUp =async (req,res) => { try {

    const {email, password, confirmPassword, username } = req.body

    let existingUsername=await Participant.findOne({ username })
    if (existingUsername){
    return res.status(400).send(' Username already taken! Please choose another one.')
  }
      

    if (password !== confirmPassword || password === "") {
      return res.status(400).send("Password must match")
    }

    let passwordDigest = await middleware.hashPassword(password)


    let existingEmail = await Participant.findOne({ email })
    if (existingEmail) {
      return res.status(400).send("A user with that email has already been registered!")
    } else {
      const user = await Participant.create({username, email, passwordDigest })

      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}

exports.SignIn = async (req,res)=>{
  try {
console.log('dvfdv')
    const { email, password } = req.body

    const user = await Participant.findOne({ email })

    let matched = await middleware.comparePassword(password,
      user.passwordDigest
    )

    if (matched) {
      let payload = {
        username: user.username,
        email: user.email,
        id: user._id,
      }

      let token = middleware.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred logging in!' })
  }
}