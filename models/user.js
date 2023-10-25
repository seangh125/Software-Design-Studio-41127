const mongoose = require('mongoose');

const user = new mongoose.Schema({
  firstname: String,
  surname: String,
  password: String,
  email: String,
  education: String,
});

const User = mongoose.model('User', user);

module.exports = User;