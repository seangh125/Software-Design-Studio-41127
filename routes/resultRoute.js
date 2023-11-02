const express = require('express');
const router = express.Router();
const Result = require('../models/resultModel'); 
const User = require('../models/user');

router.post('/save-Result', async (req, res) => {
  try {
    const { currentDifficulty, sessionIdentifier, totalAnswers } = req.body;

    const user = await User.findOne({ email: req.session.user });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.education = currentDifficulty;
    req.session.education = currentDifficulty;

    // Create an object for the totalAnswers structure
    const totalAnswersData = {
      "Year 10": totalAnswers["Year 10"],
      "Year 11": totalAnswers["Year 11"],
      "Year 12": totalAnswers["Year 12"],
    };

    // Save the current difficulty level, current date, session identifier, and totalAnswers to MongoDB
    const result = new Result({
      difficulty: currentDifficulty,
      sessionIdentifier: sessionIdentifier,
      totalAnswers: totalAnswersData,
    });

    const savedResult = await result.save();

    console.log('Difficulty level and totalAnswers saved to MongoDB:', savedResult);

    res.json({ success: true, message: 'Difficulty level and totalAnswers saved successfully' });
  } catch (error) {
    console.error('Error saving difficulty level and totalAnswers:', error);
    res.status(500).json({ success: false, message: 'Failed to save difficulty level and totalAnswers' });
  }
});

module.exports = router;
