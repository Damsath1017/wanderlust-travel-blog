const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// POST /api/subscribe - Subscribe a new user
router.post('/', async (req, res) => {
  try {
    const { fullName, idNumber, contactNumber, email } = req.body;

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'This email is already subscribed!' });
    }

    const subscriber = new Subscriber({ fullName, idNumber, contactNumber, email });
    const saved = await subscriber.save();
    res.status(201).json({ message: 'Successfully subscribed!', subscriber: saved });
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
});

// GET /api/subscribe - Get all subscribers (for admin)
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
