const express = require("express");
const { addQuestion, getSingleQuestion } = require("../controllers/questionController");

const router = express.Router();

router.get("/:qsNumber", getSingleQuestion);

// post a question
router.post("/", addQuestion);

module.exports = router;
