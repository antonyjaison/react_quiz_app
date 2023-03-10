const Question = require("../models/questionModel");

// get a sinple question
const getSingleQuestion = async (req,res) => {
  const { qsNumber } = req.params;
  console.log(qsNumber)
  const question = await Question.find({questionNo: qsNumber})
  const totalQs = question.length
  const randomQsNo = Math.floor(Math.random() * totalQs)
  res.status(200).json(question[randomQsNo])
}


// add question to database
const addQuestion = async (req, res) => {
  const { question, questionNo, a, b, c, d } = req.body;
  try {
    const qs = await Question.create({
      question,
      questionNo,
      a,
      b,
      c,
      d,
    });
    res.status(200).json(qs);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addQuestion,getSingleQuestion };
