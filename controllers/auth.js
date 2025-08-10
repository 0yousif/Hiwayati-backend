const Participant = require("../models/Participant")
const Teacher = require("../models/Teacher")
const middleware = require("../middleware/index")


exports.auth_signUp_post = async (req, res) => {

  let userType

  if (req.body.isTeacher) {
    userType = Teacher
  } else {
    userType = Participant
  }

  try {
    const { email, password, confirmPassword, username, bio } = req.body

    if (password !== confirmPassword || password === "") {
      return res.status(400).send("Password must match")
    }

    let passwordDigest = await middleware.hashPassword(password)

    let existingUsername = await userType.findOne({ username })
    if (existingUsername) {
      return res
        .status(400)
        .send(" Username already taken! Please choose another one.")
    }

    let existingEmail = await userType.findOne({ email })
    if (existingEmail) {
      return res
        .status(400)
        .send("A user with that email has already been registered!")
    } else {
      const user = await userType.create(
        req.body.isTeacher
          ? { username, email, passwordDigest, bio }
          : { username, email, passwordDigest }
      )

      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}
  
exports.auth_signIn_post = async (req, res) => {
  let userType

  if (req.body.isTeacher) {
    userType = Teacher
  } else {
    userType = Participant
  }

  try {
    const { email, password } = req.body
    const user = await userType.findOne({ email })
    let matched = await middleware.comparePassword(
      password,
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
    return res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    console.log(error)
    res
      .status(401)
      .send({ status: "Error", msg: "An error has occurred logging in!" })
  }
}

exports.auth_update_put = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body

    let user = await Teacher.findById(req.params.id)
    let userType = Teacher
    if (!user) {
      user = await Participant.findById(req.params.id)
      userType = Participant
    }
    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    if (res.locals.payload.id === user.id) {
      if (matched) {
        let passwordDigest = await middleware.hashPassword(newPassword)
        user = await userType.findByIdAndUpdate(req.params.id, {
          passwordDigest,
        })
        let payload = {
          id: user._id,
          email: user.email,
        }

        return res
          .status(200)
          .send({ status: "Password Updated!", user: payload })
      } else {
        return res
          .status(400)
          .send({ status: "Error", msg: "Old Password did not match!" })
      }
    }
    res
      .status(401)
      .send({ status: "Error", msg: "You can't edit this profile" })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: "Error",
      msg: "An error has occurred updating password!",
    })
  }
}

exports.auth_delete_delete = async (req, res) => {
  try {
    let isUser = await Teacher.findById(req.params.id)

    if (!isUser) {
      isUser = await Participant.findById(req.params.id)
    }

    if (res.locals.payload.id === isUser.id) {
      await userType.findByIdAndDelete(req.params.id)

      return res.status(200).send({ status: "User Delete!" })
    }
    res.status(401).send({ status: "Error", msg: "You can't delete thi user" })
  } catch (error) {
    res.status(401).send({
      status: "Error",
      msg: "An error has occurred while deleting user",
    })
  }
}

exports.CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

exports.auth_profile_get = async (req, res) => {
  try {
    let user = await Teacher.findById(req.params.id)

    if (!user) {
      user = await Participant.findById(req.params.id)
    }
    res.status(200).send(user)
  } catch (error) {
    throw error
  }
}
