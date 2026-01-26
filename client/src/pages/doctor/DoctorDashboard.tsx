import { useState, useEffect } from 'react';
import API from '../../api';
import DoctorCalendar from '../../components/doctor/DoctorCalendar';
import AvailabilityForm from '../../components/doctor/AvailabilityForm';
import { Appointment } from '../../types';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await API.get('/appointments');
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
                    <p className="text-gray-500">Manage your schedule and appointments</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Calendar</h2>
                    <DoctorCalendar appointments={appointments} />
                </div>
                <div>
                    <AvailabilityForm />
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
