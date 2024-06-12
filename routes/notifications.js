// server/routes/notifications.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notifications');

// Route to get user notifications
router.get('/', auth, async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id });
        res.json(notifications);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
