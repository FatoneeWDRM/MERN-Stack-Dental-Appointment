const express = require('express');
const router = express.Router();
const { getPatients, getPatient, updatePatientProfile, deletePatient } = require('../controllers/patientController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getPatients) // Add role check inside controller or specific middleware
    .post(protect, updatePatientProfile); // User creates/updates own profile

router.route('/:id')
    .get(protect, getPatient)
    .delete(protect, admin, deletePatient);

// Note: admin middleware here refers to 'staff' in my implementation of authMiddleware

module.exports = router;
