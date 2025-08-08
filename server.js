// imports
const express = require('express')
require('dotenv').config()
const session = require('express-session')
const path = require('path')




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
const ProviderRouter = require('./routes/ProviderRouter')

// use Routers
app.use('/',skillRouter)
app.use('/',ProviderRouter)


// Listener
app.listen(port, ()=>{
  console.log(`server is running on port ${port}`)
})