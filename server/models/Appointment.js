const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String, // e.g., "10:30"
        required: true,
    },
    status: {
        type: String,
        enum: ['booked', 'confirmed', 'in-progress', 'completed', 'cancelled'],
        default: 'booked',
    },
    reason: {
        type: String,
    },
    notes: {
        type: String, // Doctor's notes
    },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
