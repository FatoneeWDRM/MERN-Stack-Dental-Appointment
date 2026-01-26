const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private (Patient)
const bookAppointment = async (req, res, next) => {
    try {
        const { doctorId, date, time, reason } = req.body;

        // Find patient profile
        const patient = await Patient.findOne({ user: req.user._id });
        if (!patient) {
            res.status(404);
            throw new Error('Patient profile not found. Please complete your profile first.');
        }

        // Check if doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            res.status(404);
            throw new Error('Doctor not found');
        }

        // Check availability (Simple exact match for now)
        // In a real app, check for time ranges overlapping
        const existingAppointment = await Appointment.findOne({
            doctor: doctorId,
            date: date, // Assuming date is ISO string YYYY-MM-DDT00:00:00.000Z
            time: time,
            status: { $ne: 'cancelled' },
        });

        if (existingAppointment) {
            res.status(400);
            throw new Error('Doctor is not available at this time');
        }

        const appointment = await Appointment.create({
            patient: patient._id,
            doctor: doctorId,
            date,
            time,
            reason,
        });

        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private (Admin/Doctor/Patient)
const getAppointments = async (req, res, next) => {
    try {
        let query = {};

        if (req.user.role === 'patient') {
            const patient = await Patient.findOne({ user: req.user._id });
            if (!patient) return res.json([]);
            query = { patient: patient._id };
        } else if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ user: req.user._id });
            if (!doctor) return res.json([]);
            query = { doctor: doctor._id };
        }
        // Staff/Admin sees all

        const appointments = await Appointment.find(query)
            .populate('patient', 'phone') // Populate patient details (phone is in Patient model)
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name email' }
            })
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            });

        res.json(appointments);
    } catch (error) {
        next(error);
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Doctor/Staff)
const updateAppointmentStatus = async (req, res, next) => {
    try {
        const { status, notes } = req.body;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            res.status(404);
            throw new Error('Appointment not found');
        }

        // Verify ownership if doctor
        if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ user: req.user._id });
            if (!doctor || appointment.doctor.toString() !== doctor._id.toString()) {
                res.status(403);
                throw new Error('Not authorized');
            }
        }

        appointment.status = status || appointment.status;
        appointment.notes = notes || appointment.notes;

        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);

    } catch (error) {
        next(error);
    }
};

// @desc    Cancel Appointment
// @route   DELETE /api/appointments/:id
// @access  Private (Patient/Doctor/Admin)
const deleteAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            res.status(404);
            throw new Error('Appointment not found');
        }

        // Logic: Patient cancels own, Doctor cancels own, Admin cancels any
        if (req.user.role === 'patient') {
            const patient = await Patient.findOne({ user: req.user._id });
            if (!patient || appointment.patient.toString() !== patient._id.toString()) {
                res.status(403);
                throw new Error('Not authorized to cancel this appointment');
            }
        } else if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ user: req.user._id });
            if (!doctor || appointment.doctor.toString() !== doctor._id.toString()) {
                res.status(403);
                throw new Error('Not authorized');
            }
        }

        appointment.status = 'cancelled';
        await appointment.save();

        res.json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('doctor', 'specialization consultationFee')
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            })
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name phone' }
            });

        if (!appointment) {
            res.status(404);
            throw new Error('Appointment not found');
        }
        res.json(appointment);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    bookAppointment,
    getAppointments,
    updateAppointmentStatus,
    deleteAppointment,
    getAppointmentById
};
