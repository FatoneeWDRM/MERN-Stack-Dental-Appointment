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
            specialization: 'General Practitioner',
            qualifications: 'MD',
            experience: 10,
            feesPerConsultation: 500,
            schedules: [
                { day: 'Monday', startTime: '09:00', endTime: '17:00' },
                { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
                { day: 'Wednesday', startTime: '09:00', endTime: '12:00' },
                { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
                { day: 'Friday', startTime: '09:00', endTime: '15:00' }
            ]
        });

        // Create Patient Profile
        await Patient.create({
            user: patientUser._id,
            phone: '123-456-7890',
            address: '123 Main St',
            gender: 'Female',
            dateOfBirth: new Date('1990-01-01'),
            medicalHistory: 'None',
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
                time: '09:00',
                reason: 'Regular Checkup',
                status: 'booked'
            },
            {
                doctor: doctorUser._id,
                patient: patientUser._id,
                date: tomorrow,
                time: '14:30',
                reason: 'Toothache',
                status: 'booked'
            },
            {
                doctor: doctorUser._id,
                patient: patientUser._id,
                date: dayAfter,
                time: '10:00',
                reason: 'Cleaning',
                status: 'confirmed'
            },
            {
                doctor: doctorUser._id,
                patient: patientUser._id,
                date: new Date(today.getTime() - 86400000), // Yesterday
                time: '11:00',
                reason: 'Follow up',
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
