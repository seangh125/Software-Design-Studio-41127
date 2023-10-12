const express = require('express');
const router = express.Router();
const Result = require('../models/resultModel'); 

// Create a route to save the difficulty level
router.post('/save-Result', async (req, res) => {
  try {
    const { currentDifficulty, sessionIdentifier } = req.body;

    // Save the current difficulty level, current date, and session identifier (as a string) to MongoDB
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