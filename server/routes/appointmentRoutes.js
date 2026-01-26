const express = require('express');
const router = express.Router();
const {
    bookAppointment,
    getAppointments,
    updateAppointmentStatus,
    deleteAppointment,
    getAppointmentById
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, bookAppointment)
    .get(protect, getAppointments);

router.route('/:id')
    .get(protect, getAppointmentById)
    .put(protect, updateAppointmentStatus)
    .delete(protect, deleteAppointment);

module.exports = router;
