const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  //probably add current user_id along with other data later
  difficulty: String,
  date: {
    type: Date,
    default: Date.now, // This sets the default value to the current date and time
  },
  sessionIdentifier: String,
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;