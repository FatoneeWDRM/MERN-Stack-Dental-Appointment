const express = require('express');
const router = express.Router();
const {
    createPrescription,
    getMyPrescriptions,
    getPrescriptionById
} = require('../controllers/prescriptionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createPrescription);

router.route('/my')
    .get(protect, getMyPrescriptions);

router.route('/:id')
    .get(protect, getPrescriptionById);

module.exports = router;
