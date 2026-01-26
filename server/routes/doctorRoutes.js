const express = require('express');
const router = express.Router();
const { getDoctors, getDoctor, updateDoctorProfile, getDoctorSlots, getDoctorProfile } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getDoctors)
router.route('/profile')
    .get(protect, getDoctorProfile)
    .post(protect, updateDoctorProfile);

router.route('/:id')
    .get(getDoctor);

router.route('/:id/slots')
    .get(getDoctorSlots);

module.exports = router;
