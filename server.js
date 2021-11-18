require("dotenv").config()
const path = require('path')
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const passport = require('passport')
const bodyParser = require("body-parser")
const cookieSession = require('cookie-session')
const questionRoute = require("./routes/questionRoute")
const userRoute = require("./routes/userRoute")
const authRoute = require("./routes/authRoute")
require('./passport')

function checkUserLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401)
}

const app = express()

app.use(cookieSession({
  name: 'session-name',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.QUESTION_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/pages'))

app.use("/", authRoute)
app.use("/", questionRoute)
app.use("/", userRoute)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"))
})

app.get("/links", checkUserLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "links.html"))
})

app.get("/admin", checkUserLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin.html"))
})

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`)
})
