const express = require("express")
const questionRoute = require("../controllers/questionController")
const checkAdminLoggedIn = require("../middleware/adminAuth")
const checkAdminLoggedInMobile = require("../middleware/adminAuthMobile")
const checkUserLoggedIn = require("../middleware/userAuth")

router = express.Router()

router.get("/questions", checkAdminLoggedIn, questionRoute.getQuestions)
router.get("/vanilla", checkUserLoggedIn, questionRoute.vanilla)
router.get("/qsmobile", checkAdminLoggedInMobile, questionRoute.getQuestions)
router.post("/questions", checkAdminLoggedIn, questionRoute.postQuestion)

module.exports = router
