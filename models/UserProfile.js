const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobProfile: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    resumeUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
