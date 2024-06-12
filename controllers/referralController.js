// server/controllers/referralController.js
const ReferralRequest = require('../models/ReferralRequest');
const Notification = require('../models/Notifications'); // Ensure this path is correct
const UserProfile = require('../models/UserProfile');
const User = require('../models/User'); // Ensure this path is correct

exports.createReferralRequest = async (req, res) => {
    try {
        const { companyName, jobUrl, resumeUrl } = req.body;

        const requestingUser = await User.findById(req.user.id);

        const newRequest = new ReferralRequest({
            companyName,
            jobUrl,
            resumeUrl,
            user: req.user.id
        });

        const referralRequest = await newRequest.save();

        const employees = await UserProfile.find({ companyName });

        for (const employee of employees) {
            const notification = new Notification({
                userId: employee.userId,
                applicantId: req.user.id,
                companyName: companyName,
                jobUrl: jobUrl,
                message: `A new referral request for ${companyName} has been made by ${requestingUser.name}.`
            });
            await notification.save();
        }

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

exports.giveReferral = async (req, res) => {
    try {
        const referral = await ReferralRequest.findById(req.params.id);

        if (!referral) {
            return res.status(404).json({ msg: 'Referral request not found' });
        }

        referral.fulfilled = true;
        await referral.save();

        res.json({ msg: 'Referral given successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
