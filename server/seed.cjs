const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment'); // Ensure this model exists

// ... (existing code)


dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Doctor.deleteMany();
        await Patient.deleteMany();
        // Appointments are not seeded, but you could if needed

        const users = [
            {
                name: 'Staff Member',
                email: 'staff@example.com',
                password: 'password123',
                role: 'staff',
            },
            {
                name: 'Dr. John Doe',
                email: 'doctor@example.com',
                password: 'password123',
                role: 'doctor',
            },
            {
                name: 'Jane Patient',
                email: 'patient@example.com',
                password: 'password123',
                role: 'patient',
            },
        ];

        // Create Users one by one to ensure middleware runs correctly
        const createdUsers = [];
        for (const user of users) {
            const createdUser = await User.create(user);
            createdUsers.push(createdUser);
        }

        const staffUser = createdUsers[0];
        const doctorUser = createdUsers[1];
        const patientUser = createdUsers[2];

        // Create Doctor Profile
        await Doctor.create({
            user: doctorUser._id,
            specialization: 'Chiropractor & Physical Therapist',
            qualifications: 'B.Sc. Physical Therapy, Certified Chiropractor',
            experience: 10,
            feesPerConsultation: 1500,
            schedules: [
                { day: 'Monday', startTime: '09:00', endTime: '19:00' },
                { day: 'Tuesday', startTime: '09:00', endTime: '19:00' },
                { day: 'Wednesday', startTime: '09:00', endTime: '19:00' },
                { day: 'Thursday', startTime: '09:00', endTime: '19:00' },
                { day: 'Friday', startTime: '09:00', endTime: '19:00' },
                { day: 'Saturday', startTime: '10:00', endTime: '17:00' }
            ]
        });

        // Create Patient Profile
        await Patient.create({
            user: patientUser._id,
            phone: '081-234-5678',
            address: '123 Bangkok, Thailand',
            gender: 'Female',
            dateOfBirth: new Date('1995-05-15'),
            medicalHistory: 'Office Syndrome, Migraine',
        });

        // Create Mock Appointments
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const dayAfter = new Date(today);
        dayAfter.setDate(today.getDate() + 2);

        // Ensure strictly YYYY-MM-DD for consistency if needed, but Date object is fine for mongoose

        await Appointment.create([
            {
                doctor: doctorUser._id,
                patient: patientUser._id,
                date: tomorrow,
                time: '10:00',
                reason: 'Office Syndrome Therapy',
                status: 'booked'
            },
            {
                doctor: doctorUser._id,
                patient: patientUser._id,
                date: tomorrow,
                time: '14:30',
                reason: 'Bone Adjustment (Chiropractic)',
                status: 'booked'
            },
            {
                doctor: doctorUser._id,
                patient: patientUser._id,
                date: dayAfter,
                time: '11:00',
                reason: 'Ultrasound Therapy',
                status: 'confirmed'
            },
            {
                doctor: doctorUser._id,
                patient: patientUser._id,
                date: new Date(today.getTime() - 86400000), // Yesterday
                time: '16:00',
                reason: 'Initial Consultation',
                status: 'completed'
            }
        ]);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
