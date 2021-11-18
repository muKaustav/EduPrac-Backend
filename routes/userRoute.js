const express = require("express")
const userRoute = require("../controllers/userController")

router = express.Router()

router.get("/users", userRoute.getUsers)
router.post("/users", userRoute.postUser)

module.exports = router
