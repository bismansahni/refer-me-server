const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const referralController = require('../controllers/referralController');
const auth = require('../middleware/auth');

router.post(
    '/',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('industry', 'Industry is required').not().isEmpty()
        ]
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        referralController.createReferralRequest(req, res);
    }
);

router.get('/', auth, referralController.getReferralRequests);

// Add a route for giving a referral
router.post('/give/:id', auth, referralController.giveReferral);

module.exports = router;
