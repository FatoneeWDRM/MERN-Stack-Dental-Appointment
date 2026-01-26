import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import appointmentService from '../api/appointmentService';
import StatusBadge from '../components/common/StatusBadge';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { format } from 'date-fns';
import clsx from 'clsx';
import jsPDF from 'jspdf';

interface Appointment {
    _id: string;
    date: string;
    time: string;
    status: string;
    reason?: string;
    doctor: {
        specialization: string;
        user: { name: string };
    };
    patient: {
        user: { name: string; phone?: string; email?: string };
    };
}

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const fetchAppointments = async () => {
        try {
            const data = await appointmentService.getAppointments();
            setAppointments(data);
        } catch (error) {
            toast.error('Failed to load appointments');
        } finally {
            // Loading state removed
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCancel = async (id: string) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
        try {
            await appointmentService.cancelAppointment(id);
            toast.success('Appointment cancelled successfully');
            fetchAppointments(); // Refresh list
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Cancellation failed');
        }
    };

    const handlePrint = (id: string) => {
        const appointment = appointments.find(a => a._id === id);
        if (!appointment) return;

        const doc = new jsPDF();

        // Header
        doc.setFillColor(37, 99, 235); // Blue color
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text('Smart Smile Dental', 105, 20, { align: 'center' });
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

        addLine('Appointment ID:', appointment._id.toUpperCase().slice(-8));
        addLine('Date:', format(new Date(appointment.date), 'PPPP'));
        addLine('Time:', appointment.time);
        y += 5;
        addLine('Dentist:', appointment.doctor.user.name);
        addLine('Specialization:', appointment.doctor.specialization);
        y += 5;
        addLine('Patient Name:', appointment.patient.user.name);
        if (appointment.reason) {
            addLine('Note:', appointment.reason);
        }

        // Footer
        y += 20;
        doc.setDrawColor(200, 200, 200);
        doc.line(20, y, 190, y);
        y += 10;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('* Please arrive 15 minutes before your scheduled time.', 105, y, { align: 'center' });
        doc.text('* Present this slip at the reception.', 105, y + 5, { align: 'center' });

        doc.save(`appointment-slip-${appointment._id.slice(-6)}.pdf`);
        toast.success('Slip downloaded successfully');
    };

    // Filter logic
    const upcoming = appointments.filter(a => a.status !== 'cancelled' && a.status !== 'completed'); // Simplified logic
    const past = appointments.filter(a => a.status === 'completed');
    const cancelled = appointments.filter(a => a.status === 'cancelled');

    const renderList = (list: Appointment[]) => {
        if (list.length === 0) return <div className="p-8 text-center text-gray-500">No appointments found.</div>;

        return (
            <div className="space-y-4">
                {list.map((apt: Appointment) => (
                    <div key={apt._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center transition-colors">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
                                    {format(new Date(apt.date), 'MMMM d, yyyy')}
                                </span>
                                <StatusBadge status={apt.status} />
                                <span className="text-gray-500 text-sm">{apt.time}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Dentist:</span> {apt.doctor.user.name} ({apt.doctor.specialization})
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Patient:</span> {apt.patient.user.name}
                            </p>
                            {apt.reason && <p className="text-sm text-gray-400 mt-1">Note: {apt.reason}</p>}
                        </div>

                        <div className="flex space-x-3 mt-4 md:mt-0">
                            {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                                <button
                                    onClick={() => handleCancel(apt._id)}
                                    className="px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                onClick={() => handlePrint(apt._id)}
                                className="px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                            >
                                Slip 🖨️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Appointments</h1>

            <TabGroup>
                <TabList className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
                    {['Upcoming', 'Past History', 'Cancelled'].map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                clsx(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white text-blue-700 shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    <TabPanel>{renderList(upcoming)}</TabPanel>
                    <TabPanel>{renderList(past)}</TabPanel>
                    <TabPanel>{renderList(cancelled)}</TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
};

export default AppointmentsPage;
