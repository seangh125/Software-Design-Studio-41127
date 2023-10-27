const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/registerUser', async (req, res) => {
  const formData = req.body;

  if (!formData.firstname || !formData.surname || !formData.email || !formData.password || !formData.education) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const existingUser = await User.findOne({ email: formData.email });
  if (existingUser) {
    return res.status(409).json({ error: 'Email is already in use' });
  }

  try {
    const newUser = new User({
      firstname: formData.firstname,
      surname: formData.surname,
      password: formData.password,
      email: formData.email,
      education: formData.education,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error saving user');
  }
});

module.exports = router;
