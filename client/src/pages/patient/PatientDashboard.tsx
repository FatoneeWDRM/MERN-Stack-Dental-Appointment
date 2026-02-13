import { useState, useEffect } from 'react';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaCalendarPlus, FaNotesMedical, FaUserMd, FaClock } from 'react-icons/fa';

interface Appointment {
    _id: string;
    doctor: {
        _id: string;
        user: { name: string };
        specialization: string;
    };
    date: string;
    time: string;
    reason: string;
    status: 'booked' | 'completed' | 'cancelled';
}

const PatientDashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await API.get('/appointments');
                setAppointments(data);
            } catch (error) {
                console.error("Failed to fetch appointments", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchAppointments();
        }
    }, [user]);

    const upcomingAppointments = appointments.filter(apt => new Date(apt.date) >= new Date() && apt.status !== 'cancelled' && apt.status !== 'completed');
    const pastAppointments = appointments.filter(apt => new Date(apt.date) < new Date() || apt.status === 'completed');

    if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Health Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your appointments and view medical history</p>
                </div>
                <Link
                    to="/dashboard/book-appointment"
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium"
                >
                    <FaCalendarPlus />
                    Book Appointment
                </Link>
            </div>

            {/* Upcoming Appointments */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <FaClock className="text-teal-500" /> Upcoming Appointments
                </h2>

                {upcomingAppointments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingAppointments.map((apt) => (
                            <div key={apt._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                        {apt.status}
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                        {format(new Date(apt.date), 'EEE, MMM d, yyyy')}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{apt.reason}</h3>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    <FaClock className="text-gray-400" /> {apt.time}
                                </div>

                                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                        <FaUserMd />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{apt.doctor.user.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{apt.doctor.specialization}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No upcoming appointments scheduled.</p>
                        <Link to="/dashboard/book-appointment" className="text-teal-600 hover:text-teal-700 font-medium hover:underline">
                            Schedule your first visit
                        </Link>
                    </div>
                )}
            </div>

            {/* Past Appointments / History */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <FaNotesMedical className="text-blue-500" /> Medical History
                </h2>

                {pastAppointments.length > 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Treatment</th>
                                    <th className="px-6 py-4">Specialist</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {pastAppointments.map((apt) => (
                                    <tr key={apt._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {format(new Date(apt.date), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                            {apt.reason}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {apt.doctor.user.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${apt.status === 'completed'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                                }`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-gray-500 dark:text-gray-400 italic">No medical history found.</div>
                )}
            </div>
        </div>
    );
};

export default PatientDashboard;
