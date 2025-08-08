const Participant =require('../models/Participant')
const Teacher  = require('../models/Teacher')
const middleware = require('../middleware/index')



exports.SignUp =async (req,res) => { 

  let userType

  if(req.body.isTeacher==='on'){
    userType= Teacher
  }
  else{
    userType=Participant
  }
  
  try {

    const {email, password, confirmPassword, username,bio } = req.body

    let existingUsername=await userType.findOne({ username })
    if (existingUsername){
    return res.status(400).send(' Username already taken! Please choose another one.')
  }
      

    if (password !== confirmPassword || password === "") {
      return res.status(400).send("Password must match")
    }

    let passwordDigest = await middleware.hashPassword(password)


    let existingEmail = await userType.findOne({ email })
    if (existingEmail) {
      return res.status(400).send("A user with that email has already been registered!")
    } else {
      const user = await userType.create(req.body.isTeacher==="on"?{username,email,passwordDigest,bio}:{username, email, passwordDigest })

      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}

exports.SignIn = async (req,res)=>{
  let userType

  if(req.body.isTeacher==='on'){
    userType= Teacher
  }
  else{
    userType=Participant
  }
  
  try {

    const { email, password } = req.body

    const user = await userType.findOne({ email })

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

exports.Update = async (req, res) => {

  try {

    const { oldPassword, newPassword  } = req.body

    let user = await Teacher.findById(req.params.id);
    let userType = Teacher

    if (!user) {
      user = await Participant.findById(req.params.id)
      userType = Participant
    }
    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await userType.findByIdAndUpdate(req.params.id, {
        passwordDigest
      })
      let payload = {
        id: user._id,
        name: user.name,
        email: user.email
      }
      return res.status(200).send({ status: 'Password Updated!', user: payload })
    }
    res.status(401).send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}