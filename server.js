// imports
const express = require('express')
require('dotenv').config()
const session = require('express-session')
const path = require('path')
const cors = require("cors")

// Initialize app
const app = express()

// Database Configuration
const mongoose = require('./config/db')

// set Port Configuration
const port = process.env.PORT ? process.env.PORT : 3000

// Require MiddleWares
const morgan = require('morgan')


// Require passUserToView & isSignedIn middlewares


// use MiddleWares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))



// Session Configurations
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

//passUserToView middleware


// Root Route
app.get('/', (req, res) => {
  res.send('Your app is connected . . . ')
})

// Require Routers
const coursesRouter = require("./routes/courses")

// use Routers
app.use("/course",coursesRouter)

// Listener
app.listen(port, ()=>{
  console.log(`server is running on port ${port}`)
})