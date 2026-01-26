const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find().populate('user', 'name email');
        res.json(doctors);
    } catch (error) {
        next(error);
    }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('user', 'name email');
        if (!doctor) {
            res.status(404);
            throw new Error('Doctor not found');
        }
        res.json(doctor);
    } catch (error) {
        next(error);
    }
};

// @desc    Get available slots for a doctor on a specific date
// @route   GET /api/doctors/:id/slots
// @access  Public
const getDoctorSlots = async (req, res, next) => {
    try {
        const { date } = req.query; // YYYY-MM-DD
        if (!date) {
            res.status(400);
            throw new Error('Date is required');
        }

        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            res.status(404);
            throw new Error('Doctor not found');
        }

        const queryDate = new Date(date);
        const dayOfWeek = queryDate.toLocaleDateString('en-US', { weekday: 'long' });

        const schedule = doctor.schedules.find(s => s.day === dayOfWeek);

        if (!schedule || !schedule.isAvailable) {
            return res.json([]);
        }

        // Generate Slots
        const slots = [];
        let [startHour, startMinute] = schedule.startTime.split(':').map(Number);
        let [endHour, endMinute] = schedule.endTime.split(':').map(Number);

        let current = new Date(queryDate);
        current.setHours(startHour, startMinute, 0, 0);

        const end = new Date(queryDate);
        end.setHours(endHour, endMinute, 0, 0);

        while (current < end) {
            const timeString = current.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            slots.push(timeString);
            current.setMinutes(current.getMinutes() + 30); // 30 min intervals
        }

        // Fetch Booked Appointments
        const Appointment = require('../models/Appointment');
        const appointments = await Appointment.find({
            doctor: doctor._id,
            date: {
                $gte: new Date(date),
                $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
            },
            status: { $ne: 'cancelled' }
        });

        const bookedTimes = appointments.map(a => a.time);

        // Filter valid slots
        const availableSlots = slots.filter(slot => !bookedTimes.includes(slot));

        res.json(availableSlots);
    } catch (error) {
        next(error);
    }
};

// @desc    Create/Update Doctor Profile
// @route   POST /api/doctors/profile
// @access  Private (Doctor)
const updateDoctorProfile = async (req, res, next) => {
    try {
        const { specialization, qualifications, experience, schedules, feesPerConsultation } = req.body;

        let doctor = await Doctor.findOne({ user: req.user._id });

        if (doctor) {
            doctor.specialization = specialization || doctor.specialization;
            doctor.qualifications = qualifications || doctor.qualifications;
            doctor.experience = experience || doctor.experience;
            doctor.schedules = schedules || doctor.schedules;
            doctor.feesPerConsultation = feesPerConsultation || doctor.feesPerConsultation;

            const updatedDoctor = await doctor.save();
            res.json(updatedDoctor);
        } else {
            doctor = new Doctor({
                user: req.user._id,
                specialization,
                qualifications,
                experience,
                schedules,
                feesPerConsultation,
            });
            const createdDoctor = await doctor.save();
            res.status(201).json(createdDoctor);
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get current doctor profile
// @route   GET /api/doctors/profile
// @access  Private (Doctor)
const getDoctorProfile = async (req, res, next) => {
    try {
        const doctor = await Doctor.findOne({ user: req.user._id });
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404);
            throw new Error('Doctor profile not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { getDoctors, getDoctor, updateDoctorProfile, getDoctorSlots, getDoctorProfile };
