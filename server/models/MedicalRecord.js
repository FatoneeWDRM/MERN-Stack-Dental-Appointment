const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    visitDate: {
        type: Date,
        default: Date.now
    },
    diagnosis: {
        type: String,
        required: true
    },
    symptoms: {
        type: String
    },
    vitals: {
        bloodPressure: String,
        temperature: Number,
        pulse: Number,
        weight: Number,
        height: Number
    },
    treatmentPlan: {
        type: String
    },
    attachments: [{
        name: String,
        url: String, // URL to stored file
        type: String // e.g., "Lab Report", "X-Ray"
    }],
    notes: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
