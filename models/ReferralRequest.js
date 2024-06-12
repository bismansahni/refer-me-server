const mongoose = require('mongoose');

const ReferralRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: {
        type: String,
        required: true
    },
    jobUrl: {
        type: String,
        required: true
    },
    resumeUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ReferralRequest', ReferralRequestSchema);
