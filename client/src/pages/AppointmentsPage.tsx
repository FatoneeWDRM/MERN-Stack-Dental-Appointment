import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import React from 'react';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import { FaCalendarCheck, FaClock, FaUserMd, FaTimesCircle, FaPrint } from 'react-icons/fa';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

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
    status: 'booked' | 'confirmed' | 'cancelled' | 'completed';
}

const AppointmentsPage = () => {
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
                toast.error("Failed to load appointments");
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchAppointments();
    }, [user]);

    const handleCancel = async (id: string) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        try {
            await API.put(`/appointments/${id}`, { status: 'cancelled' });
            toast.success("Appointment cancelled");
            setAppointments(prev => prev.map(apt => apt._id === id ? { ...apt, status: 'cancelled' } : apt));
        } catch (error) {
            console.error("Error cancelling appointment", error);
            toast.error("Failed to cancel appointment");
        }
    };

    const handlePrint = (apt: Appointment) => {
        const doc = new jsPDF();

        // Header
        doc.setFillColor(37, 99, 235); // Blue color
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text('JKD Clinic', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text('Appointment Slip', 105, 30, { align: 'center' });

        // Content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);

        let y = 60;
        const addLine = (label: string, value: string) => {
            doc.setFont('helvetica', 'bold');
            doc.text(label, 20, y);
            doc.setFont('helvetica', 'normal');
            doc.text(value, 80, y);
            y += 10;
        };

        addLine('Appointment ID:', apt._id.toUpperCase().slice(-8));
        addLine('Date:', format(new Date(apt.date), 'PPPP'));
        addLine('Time:', apt.time);
        y += 5;
        addLine('Doctor:', apt.doctor.user.name);
        addLine('Specialization:', apt.doctor.specialization);
        y += 5;
        addLine('Patient Name:', user?.name || '');
        // addLine('Patient Phone:', user?.phone || ''); // If phone is available in user context

        // Footer
        y += 20;
        doc.setDrawColor(200, 200, 200);
        doc.line(20, y, 190, y);
        y += 10;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('* Please present this slip at the counter 15 mins before time.', 105, y, { align: 'center' });

        doc.save(`appointment-${apt._id.slice(-6)}.pdf`);
        toast.success('Slip downloaded');
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading appointments...</div>;

    const sections = [
        { title: 'Upcoming Appointments', status: ['booked', 'confirmed'], color: 'blue' },
        { title: 'Past & Completed', status: ['completed'], color: 'green' },
        { title: 'Cancelled', status: ['cancelled'], color: 'gray' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Appointments</h1>

            <div className="space-y-8">
                {sections.map(({ title, status, color }) => {
                    const filtered = appointments.filter(a => status.includes(a.status));
                    if (filtered.length === 0 && title === 'Upcoming Appointments') {
                        return (
                            <div key={title} className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl text-center">
                                <p className="text-blue-600 dark:text-blue-300 mb-4">You have no upcoming appointments.</p>
                                <a href="/book-appointment" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Book Now</a>
                            </div>
                        );
                    }
                    if (filtered.length === 0) return null;

                    return (
                        <div key={title}>
                            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">{title}</h2>
                            <div className="grid gap-4">
                                {filtered.map((apt) => (
                                    <div key={apt._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition card-hover">
                                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

                                            {/* Info */}
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${apt.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                                                    apt.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    <FaCalendarCheck />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{apt.doctor.user.name}</h3>
                                                    <p className="text-sm text-blue-600 dark:text-blue-400">{apt.doctor.specialization}</p>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="flex items-center gap-1"><FaCalendarCheck /> {format(new Date(apt.date), 'MMM d, yyyy')}</span>
                                                        <span className="flex items-center gap-1"><FaClock /> {apt.time}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-3">
                                                {/* Debug Log */}
                                                {console.log(`Apt ID: ${apt._id}, Status: ${apt.status}`)}

                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${(apt.status === 'confirmed' || apt.status === 'Confirmed') ? 'bg-green-100 text-green-700' :
                                                        apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {apt.status}
                                                </span>

                                                {(apt.status === 'confirmed' || apt.status === 'Confirmed') && (
                                                    <button
                                                        onClick={() => handlePrint(apt)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                                                    >
                                                        <FaPrint /> Print Slip
                                                    </button>
                                                )}

                                                {apt.status === 'booked' && (
                                                    <button
                                                        onClick={() => handleCancel(apt._id)}
                                                        className="flex items-center gap-1 px-3 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm transition"
                                                    >
                                                        <FaTimesCircle /> Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AppointmentsPage;
