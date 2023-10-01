const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    education: String
});

const User = mongoose.model('Account', userSchema);

module.exports = User;