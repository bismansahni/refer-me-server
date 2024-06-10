const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserProfile = require('../models/UserProfile');

// Route to get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ userId: req.user.id });
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route to update user profile
router.post('/profile', auth, async (req, res) => {
    const { jobProfile, companyName, resumeUrl } = req.body;

    try {
        let profile = await UserProfile.findOne({ userId: req.user.id });

        if (!profile) {
            profile = new UserProfile({
                userId: req.user.id,
                jobProfile,
                companyName,
                resumeUrl
            });
        } else {
            profile.jobProfile = jobProfile || profile.jobProfile;
            profile.companyName = companyName || profile.companyName;
            profile.resumeUrl = resumeUrl || profile.resumeUrl;
        }

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
