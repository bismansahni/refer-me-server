const ReferralRequest = require('../models/ReferralRequest');

exports.createReferralRequest = async (req, res) => {
    try {
        const newRequest = new ReferralRequest({
            title: req.body.title,
            description: req.body.description,
            industry: req.body.industry,
            user: req.user.id
        });

        const referralRequest = await newRequest.save();
        res.json(referralRequest);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getReferralRequests = async (req, res) => {
    try {
        const referrals = await ReferralRequest.find().populate('user', ['name', 'email']);
        res.json(referrals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add the giveReferral function
exports.giveReferral = async (req, res) => {
    try {
        const referral = await ReferralRequest.findById(req.params.id);

        if (!referral) {
            return res.status(404).json({ msg: 'Referral request not found' });
        }

        // Assuming giving a referral means marking it as fulfilled or something similar
        referral.fulfilled = true;
        await referral.save();

        res.json({ msg: 'Referral given successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
