const Patient = require('../models/Patient');
const User = require('../models/User');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private (Doctor/Staff)
const getPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find().populate('user', 'name email');
        res.json(patients);
    } catch (error) {
        next(error);
    }
};

// @desc    Get patient by ID or User ID
// @route   GET /api/patients/:id
// @access  Private (Doctor/Staff/Patient Owner)
const getPatient = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('user', 'name email');

        if (!patient) {
            res.status(404);
            throw new Error('Patient not found');
        }

        // Access Control
        if (req.user.role === 'patient' && patient.user._id.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized');
        }

        res.json(patient);
    } catch (error) {
        next(error);
    }
};

// @desc    Create/Update Patient Profile (Self)
// @route   POST /api/patients/profile
// @access  Private (Patient)
const updatePatientProfile = async (req, res, next) => {
    try {
        const { phone, address, gender, dateOfBirth, medicalHistory } = req.body;

        let patient = await Patient.findOne({ user: req.user._id });

        if (patient) {
            // Update
            patient.phone = phone || patient.phone;
            patient.address = address || patient.address;
            patient.gender = gender || patient.gender;
            patient.dateOfBirth = dateOfBirth || patient.dateOfBirth;
            patient.medicalHistory = medicalHistory || patient.medicalHistory;

            const updatedPatient = await patient.save();
            res.json(updatedPatient);
        } else {
            // Create
            patient = new Patient({
                user: req.user._id,
                phone,
                address,
                gender,
                dateOfBirth,
                medicalHistory,
            });

            const createdPatient = await patient.save();
            res.status(201).json(createdPatient);
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete patient (Soft delete or hard delete)
// @route   DELETE /api/patients/:id
// @access  Private (Staff)
const deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            res.status(404);
            throw new Error('Patient not found');
        }

        // Also delete the user? Or just deactivate?
        // Let's delete the patient record.
        await patient.remove();

        res.json({ message: 'Patient removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getPatients, getPatient, updatePatientProfile, deletePatient };
