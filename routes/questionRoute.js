require("dotenv").config();
const express = require("express");
const questionRoute = require("../controllers/questionController");

router = express.Router();

router.get("/arjo/questions", questionRoute.getQuestions);
router.post("/arjo/questions", questionRoute.postQuestion);

module.exports = router;
