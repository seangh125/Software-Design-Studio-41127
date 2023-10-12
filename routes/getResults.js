const express = require('express');
const router = express.Router();
const Result = require('../models/resultModel'); // Import your result model

// Define a route for fetching results based on sessionIdentifier
router.get('/getResults', async (req, res) => {
  const { sessionIdentifier } = req.query;
  try {
    // Fetch results from MongoDB based on sessionIdentifier
    const results = await Result.find({ sessionIdentifier });

    res.json({ success: true, results });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch results' });
  }
});

module.exports = router;
