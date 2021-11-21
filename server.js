require("dotenv").config()
const path = require('path')
const cors = require("cors")
const cron = require('node-cron')
const express = require("express")
const mongoose = require("mongoose")
const passport = require('passport')
const bodyParser = require("body-parser")
const cookieSession = require('cookie-session')
const questionRoute = require("./routes/questionRoute")
const userRoute = require("./routes/userRoute")
const authRoute = require("./routes/authRoute")
const checkAdminLoggedIn = require("./middleware/adminAuth")
require('./passport')

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

app.get("/links", checkAdminLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "links.html"))
})

app.get("/admin", checkAdminLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin.html"))
})

app.get("*", (req, res) => {
  res.redirect("/")
})

let resetDailyObjective = () => {
  const Data = mongoose.model('users', user)

  Data.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      data.forEach(user => {
        user.dailyObjective = 0
        user.save()
      })
    }
  })
}

cron.schedule('55 1 * * *', () => {
  // reset daily objective every day at midnight
  resetDailyObjective()
})

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`)
})
