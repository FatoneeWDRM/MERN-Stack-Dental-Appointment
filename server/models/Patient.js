const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    medicalHistory: {
        type: String, // Could be an array of objects for more detail
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
