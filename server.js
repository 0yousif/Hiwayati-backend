// imports
const express = require('express')
require('dotenv').config()
const session = require('express-session')
const path = require('path')
const cors = require('cors')



// Initialize app
const app = express()
//fix error when post :ValidationError 
app.use(express.json())
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
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

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

const skillRouter = require('./routes/skillRouter')
const providerRouter = require('./routes/ProviderRouter')
const coursesRouter = require('./routes/courses')
const authRouter = require('./routes/auth')

// use Routers
app.use('/skill',skillRouter)
app.use('/provider',providerRouter)
app.use('/course', coursesRouter)
app.use('/auth', authRouter)


// Listener
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
