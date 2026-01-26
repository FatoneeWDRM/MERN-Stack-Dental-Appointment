const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    qualifications: {
        type: String,
    },
    experience: {
        type: Number, // Years of experience
    },
    feesPerConsultation: {
        type: Number,
        default: 0,
    },
    // structured availability
    schedules: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        startTime: { type: String, required: true }, // "09:00"
        endTime: { type: String, required: true },   // "17:00"
        isAvailable: { type: Boolean, default: true }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
