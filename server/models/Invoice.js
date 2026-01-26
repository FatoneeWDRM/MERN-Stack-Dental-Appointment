const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    items: [{
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        unitPrice: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }],
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled', 'overdue'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit_card', 'insurance', 'bank_transfer']
    },
    paymentDate: {
        type: Date
    },
    dueDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
