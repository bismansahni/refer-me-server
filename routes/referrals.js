// server/routes/referrals.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const referralController = require('../controllers/referralController'); // Ensure this path is correct
const auth = require('../middleware/auth');

router.post(
    '/',
    [
        auth,
        [
            check('companyName', 'Company name is required').not().isEmpty(),
            check('jobUrl', 'Job URL is required').not().isEmpty(),
            check('resumeUrl', 'Resume URL is required').not().isEmpty()
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

router.post('/give/:id', auth, referralController.giveReferral);

module.exports = router;
