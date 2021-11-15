require("dotenv").config();
const express = require("express");
const cors = require("cors");
const questionRoute = require("./routes/questionRoute");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://sayam:eduprac@eduprac.zy2wn.mongodb.net/QuestionsDB?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", questionRoute);

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`);
});
