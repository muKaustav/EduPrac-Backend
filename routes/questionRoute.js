const express = require("express")
const questionRoute = require("../controllers/questionController")

router = express.Router()

router.get("/questions", questionRoute.getQuestions)
router.post("/questions", questionRoute.postQuestion)

module.exports = router
