const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Participant = require("../models/Participant")
const Teacher = require("../models/Teacher")
require("dotenv").config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  return hashedPassword
}

const comparePassword = async (password, storedPassword) => {
  let PasswordMatch = await bcrypt.compare(password, storedPassword)

  return PasswordMatch
}

const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)

  return token
}

const stripToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]

    if (token) {
      res.locals.token = token
      return next()
    }

    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: "Error", msg: "Strip Token Error!" })
  }
}

const verifyToken = (req, res, next) => {
  const { token } = res.locals

  try {
    let payload = jwt.verify(token, APP_SECRET)

    if (payload) {
      res.locals.payload = payload

      return next()
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: "Error", msg: "Verify Token Error!" })
  }
}

const getUser = async (id) => {
  if (await Participant.findById(id)) {
    return await Participant.findById(id)
  } else if (await Teacher.findById(id)) {
    return await Teacher.findById(id)
  } else {
    return null
  }
}

const getUserModel = async (id) => {
  if (await Participant.findById(id)) {
    return "Participant"
  } else if (await Teacher.findById(id)) {
    return "Teacher"
  } 
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken,
  getUser,
  getUserModel
}
