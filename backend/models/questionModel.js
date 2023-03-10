const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  questionNo: {
    type: Number,
    required: true,
  },
  a: {
    type: Object,
    required: true,
    ans: {
      type: String,
      required: true,
    },
    isTrue: {
      type: Boolean,
      required: true,
    },
  },
  b: {
    type: Object,
    required: true,
    ans: {
      type: String,
      required: true,
    },
    isTrue: {
      type: Boolean,
      required: true,
    },
  },
  c: {
    type: Object,
    required: true,
    ans: {
      type: String,
      required: true,
    },
    isTrue: {
      type: Boolean,
      required: true,
    },
  },
  d: {
    type: Object,
    required: true,
    ans: {
      type: String,
      required: true,
    },
    isTrue: {
      type: Boolean,
      required: true,
    },
  },
});

module.exports = mongoose.model("Questions", questionSchema);

// {a:"cjhscn",iaTrue:true}
