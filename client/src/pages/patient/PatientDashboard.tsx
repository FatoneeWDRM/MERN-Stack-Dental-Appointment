import { useEffect, useState } from 'react';
import API from '../../api';
import PatientProfileForm from '../../components/PatientProfileForm';
import BookAppointmentForm from '../../components/BookAppointmentForm';
import { Appointment } from '../../types';

const PatientDashboard = () => {
    // const { user } = useAuth(); // Unused
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const fetchAppointments = async () => {
        try {
            const { data } = await API.get('/appointments');
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            booked: 'bg-amber-100 text-amber-800',
            confirmed: 'bg-blue-100 text-blue-800',
            'in-progress': 'bg-purple-100 text-purple-800',
            completed: 'bg-emerald-100 text-emerald-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return styles[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <h3 className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Appointments</h3>
                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">{appointments.length}</p>
                    </div>
                </div>

                {/* Recent Appointments */}
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Appointments</h3>
                    </div>

                    {appointments.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No appointments found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Time</th>
                                        <th className="px-6 py-3">Dentist</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {appointments.slice(0, 5).map((appt) => (
                                        <tr key={appt._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                {new Date(appt.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{appt.time}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {appt.doctor?.user?.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(appt.status)} capitalize`}>
                                                    {appt.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>

            <div className="space-y-6">
                {/* Actions */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Book Checkup</h3>
                    <BookAppointmentForm onAppointmentBooked={fetchAppointments} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">My Profile</h3>
                    <PatientProfileForm onProfileUpdated={fetchAppointments} />
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
