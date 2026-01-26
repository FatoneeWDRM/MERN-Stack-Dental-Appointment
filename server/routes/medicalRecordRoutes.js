const express = require('express');
const router = express.Router();
const {
    createMedicalRecord,
    getPatientRecords
} = require('../controllers/medicalRecordController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createMedicalRecord);

router.route('/patient/:patientId')
    .get(protect, getPatientRecords);

module.exports = router;
