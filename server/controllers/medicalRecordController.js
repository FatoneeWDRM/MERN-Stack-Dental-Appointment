const asyncHandler = require('express-async-handler');
const MedicalRecord = require('../models/MedicalRecord');

// @desc    Create medical record
// @route   POST /api/records
// @access  Private (Doctor only)
const createMedicalRecord = asyncHandler(async (req, res) => {
    const { patient, appointment, diagnosis, symptoms, vitals, treatmentPlan, notes } = req.body;

    const record = await MedicalRecord.create({
        doctor: req.user.doctorProfile,
        patient,
        appointment,
        diagnosis,
        symptoms,
        vitals,
        treatmentPlan,
        notes
    });

    res.status(201).json(record);
});

// @desc    Get patient records
// @route   GET /api/records/patient/:patientId
// @access  Private (Doctor/Patient)
const getPatientRecords = asyncHandler(async (req, res) => {
    const records = await MedicalRecord.find({ patient: req.params.patientId })
        .populate({
            path: 'doctor',
            populate: { path: 'user', select: 'name' }
        })
        .sort({ visitDate: -1 });

    res.json(records);
});

module.exports = {
    createMedicalRecord,
    getPatientRecords
};
