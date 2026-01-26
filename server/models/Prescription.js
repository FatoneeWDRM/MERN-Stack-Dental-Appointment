const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    medicines: [{
        medicine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine',
            required: true
        },
        dosage: {
            type: String, // e.g., "1 tablet"
            required: true
        },
        frequency: {
            type: String, // e.g., "3 times a day"
            required: true
        },
        duration: {
            type: String, // e.g., "7 days"
            required: true
        },
        instruction: {
            type: String // e.g., "After meal"
        }
    }],
    diagnosis: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'dispensed', 'completed'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
