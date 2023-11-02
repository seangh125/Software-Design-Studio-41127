const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  difficulty: String,
  date: {
    type: Date,
    default: Date.now,
  },
  sessionIdentifier: String,
  totalAnswers: {
    "Year 10": {
      rightAnswers: Number,
      wrongAnswers: Number,
    },
    "Year 11": {
      rightAnswers: Number,
      wrongAnswers: Number,
    },
    "Year 12": {
      rightAnswers: Number,
      wrongAnswers: Number,
    },
  },
  userEmail: String, // New field to store the user's email
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
