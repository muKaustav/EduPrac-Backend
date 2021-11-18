const express = require("express")
const userRoute = require("../controllers/userController")

router = express.Router()

router.get("/users", userRoute.getUsers)
router.post("/user", userRoute.postUser)
router.post("/userQuestions", userRoute.postUserQuestions)

module.exports = router
