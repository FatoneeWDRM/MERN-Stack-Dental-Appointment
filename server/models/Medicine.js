const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    genericName: {
        type: String,
        trim: true
    },
    dosage: {
        type: String, // e.g., "500mg"
        required: true
    },
    type: {
        type: String,
        enum: ['Tablet', 'Capsule', 'Liquid', 'Injection', 'Cream', 'Other'],
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    unitPrice: {
        type: Number,
        required: true
    },
    manufacturer: {
        type: String
    },
    expiryDate: {
        type: Date
    },
    description: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
