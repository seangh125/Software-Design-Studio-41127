const express = require('express');
const router = express.Router();
const User = require('../public/models/user');

router.post('/registerUser', async (req, res) => {
  const formData = req.body;
  try {
    // Create a new user document
    const newUser = new User({
      firstname: formData.firstname,
      surname: formData.surname,
      password: formData.password,
      email: formData.email,
      education: formData.education,
    });

    // Save the user document to MongoDB
    const savedUser = await newUser.save();
    console.log('User saved:', savedUser);
    res.status(200).json(savedUser);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error saving user');
  }
});

module.exports = router;