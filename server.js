require("dotenv").config()
const path = require('path')
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const questionRoute = require("./routes/questionRoute")
const userRoute = require("./routes/userRoute")

const app = express()

mongoose.connect(process.env.QUESTION_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/pages'))

app.use("/", questionRoute)
app.use("/", userRoute)
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin.html"))
})

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`)
})
