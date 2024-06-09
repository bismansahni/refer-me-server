const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/profile', [auth, upload.single('resume')], async (req, res) => {
    const { jobProfile, companyName } = req.body;
    const resume = req.file ? req.file.filename : null;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.jobProfile = jobProfile || user.jobProfile;
        user.companyName = companyName || user.companyName;
        user.resume = resume || user.resume;

        await user.save();

        res.json({ msg: 'Profile updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
