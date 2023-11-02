const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionNumber: Number,
  question: String,
  options: [String],
  correctAnswer: String,
  difficulty: String,
});

module.exports = mongoose.model('Question', questionSchema);
