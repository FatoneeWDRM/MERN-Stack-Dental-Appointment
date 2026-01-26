const asyncHandler = require('express-async-handler');
const Prescription = require('../models/Prescription');

// @desc    Create new prescription
// @route   POST /api/prescriptions
// @access  Private (Doctor only)
const createPrescription = asyncHandler(async (req, res) => {
    const { appointment, patient, medicines, diagnosis, notes } = req.body;

    const prescription = await Prescription.create({
        doctor: req.user.doctorProfile, // Assuming attached by middleware logic
        appointment,
        patient,
        medicines,
        diagnosis,
        notes
    });

    res.status(201).json(prescription);
});

// @desc    Get prescriptions for a patient
// @route   GET /api/prescriptions/my
// @access  Private (Patient)
const getMyPrescriptions = asyncHandler(async (req, res) => {
    const prescriptions = await Prescription.find({ patient: req.user.patientProfile })
        .populate({
            path: 'doctor',
            populate: { path: 'user', select: 'name' }
        })
        .sort({ createdAt: -1 });
    res.json(prescriptions);
});

// @desc    Get single prescription
// @route   GET /api/prescriptions/:id
// @access  Private
const getPrescriptionById = asyncHandler(async (req, res) => {
    const prescription = await Prescription.findById(req.params.id)
        .populate({
            path: 'doctor',
            populate: { path: 'user', select: 'name' }
        })
        .populate({
            path: 'patient',
            populate: { path: 'user', select: 'name' }
        })
        .populate('medicines.medicine');

    if (prescription) {
        res.json(prescription);
    } else {
        res.status(404);
        throw new Error('Prescription not found');
    }
});

module.exports = {
    createPrescription,
    getMyPrescriptions,
    getPrescriptionById
};
