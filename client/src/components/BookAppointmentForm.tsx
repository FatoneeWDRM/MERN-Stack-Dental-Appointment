import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../api';

interface Doctor {
    _id: string;
    specialization: string;
    user: { name: string };
    schedules: any[]; // Simplified
}

const BookAppointmentForm = ({ onAppointmentBooked }: { onAppointmentBooked: () => void }) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [loadingSlots, setLoadingSlots] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await API.get('/doctors');
                setDoctors(data);
                if (data.length > 0) setSelectedDoctor(data[0]._id);
            } catch (error) {
                console.error("Error fetching doctors");
                toast.error('Failed to load doctors');
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (!selectedDoctor || !date) {
            setAvailableSlots([]);
            return;
        }

        const fetchSlots = async () => {
            setLoadingSlots(true);
            try {
                const { data } = await API.get(`/doctors/${selectedDoctor}/slots?date=${date}`);
                setAvailableSlots(data);
                // Reset time if current time is not in new slots
                // But simplified: just clear time
                setTime('');
            } catch (error) {
                console.error("Error fetching slots");
                toast.error('Failed to load available times');
            } finally {
                setLoadingSlots(false);
            }
        };
        fetchSlots();
    }, [selectedDoctor, date]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post('/appointments', {
                doctorId: selectedDoctor,
                date,
                time,
                reason
            });
            toast.success('Appointment booked successfully! 🎉');
            if (onAppointmentBooked) onAppointmentBooked();
            setReason('');
            setTime('');
            // Optional: refresh slots to remove the booked one immediately
            const { data } = await API.get(`/doctors/${selectedDoctor}/slots?date=${date}`);
            setAvailableSlots(data);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Doctor</label>
                <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                >
                    {doctors.map(doc => (
                        <option key={doc._id} value={doc._id}>
                            {doc.user.name} - {doc.specialization}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]} // Prevent past dates
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                    <div className="relative">
                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            disabled={!date || loadingSlots || availableSlots.length === 0}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white disabled:bg-gray-100 disabled:text-gray-400"
                        >
                            <option value="">{loadingSlots ? 'Loading...' : 'Select Time'}</option>
                            {availableSlots.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                        {date && !loadingSlots && availableSlots.length === 0 && (
                            <p className="text-xs text-red-500 mt-1 absolute -bottom-5 left-0">No slots available on this date.</p>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason for Visit</label>
                <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g., Stomach ache, Fever"
                />
            </div>

            <button
                type="submit"
                disabled={!time}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Confirm Booking
            </button>
        </form>
    );
};

export default BookAppointmentForm;

