const Participant =require('../models/Participant')
const middleware = require('../middleware/index')


exports.SignUp =async (req,res) => { try {

    const {email, password, confirmPassword, username } = req.body


    if (password !== confirmPassword || password === "") {
      return res.status(400).send("Password must match")
    }

    let passwordDigest = await middleware.hashPassword(password)


    let existingUser = await Participant.findOne({ email })
    if (existingUser) {
      return res.status(400).send("A user with that email has already been registered!")
    } else {
      const user = await Participant.create({username, email, passwordDigest })

      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}
