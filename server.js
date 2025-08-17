// imports
const express = require("express")
require("dotenv").config()
const session = require("express-session")
const path = require("path")
const cors = require("cors")
const createServer = require("http").createServer
const app = express()
const server = createServer(app)
const Server = require("socket.io").Server

// import { createServer } from "http"
// import { Server } from "socket.io"

const io = new Server(server)

// Initialize app
//fix error when post :ValidationError
app.use(express.json())
// Database Configuration
const mongoose = require("./config/db")

// set Port Configuration
const port = process.env.PORT ? process.env.PORT : 3000

// Require MiddleWares
const morgan = require("morgan")

// Require passUserToView & isSignedIn middlewares

// use MiddleWares
app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "*")
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))

// Session Configurations
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

//passUserToView middleware

// Root Route
app.get("/", (req, res) => {
  res.send("Your app is connected . . . ")
})

// Require Routers

const skillRouter = require("./routes/skillRouter")
const providerRouter = require("./routes/ProviderRouter")
const coursesRouter = require("./routes/courses")
const authRouter = require("./routes/auth")

// socket connection
io.on("connection", (socket) => {
  socket.on("sendMessage", (messageContent, username, id) => {
    io.emit("receiveMessage", messageContent, username, id)
  })

  socket.on("disconnect", () => {})
})
// use Routers
app.use("/skill", skillRouter)
app.use("/provider", providerRouter)
app.use("/auth", authRouter)
app.use("/course", coursesRouter)

// Listener
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

server.listen(5000, () => {
  console.log("Server running on port 5000")
})
