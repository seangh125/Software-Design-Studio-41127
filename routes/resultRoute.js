const express = require('express');
const router = express.Router();
const Result = require('../models/resultModel'); 
const User = require('../models/user');

// Create a route to save the difficulty level
router.post('/save-Result', async (req, res) => {
  try {
    const { currentDifficulty, sessionIdentifier } = req.body;

    const user = await User.findOne({ email: req.session.user });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.education = currentDifficulty;

    req.session.education = currentDifficulty;

    await user.save();

    // Save the current difficulty level, current date, and session identifier to MongoDB
    const result = new Result({
      difficulty: currentDifficulty,
      sessionIdentifier: sessionIdentifier,
    });

    const savedResult = await result.save();

    console.log('Difficulty level saved to MongoDB:', savedResult);

    res.json({ success: true, message: 'Difficulty level saved successfully' });
  } catch (error) {
    console.error('Error saving difficulty level:', error);
    res.status(500).json({ success: false, message: 'Failed to save difficulty level' });
  }
});

module.exports = router;