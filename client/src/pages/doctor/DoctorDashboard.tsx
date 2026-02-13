import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek, addMonths, subMonths } from 'date-fns';
import { FaUserInjured, FaCalendarCheck, FaClock, FaCheck, FaTimes, FaSpinner, FaSave, FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface Appointment {
    _id: string;
    patient: {
        _id: string;
        user: { name: string; email: string };
        phone: string;
    };
    date: string;
    time: string;
    reason: string;
    status: 'booked' | 'confirmed' | 'cancelled' | 'completed';
    doctor?: {
        specialization: string;
        user: { name: string };
    };
}

interface Schedule {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

const DoctorDashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [savingSchedule, setSavingSchedule] = useState(false);

    // Calendar State
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const fetchAppointments = async () => {
        try {
            const { data } = await API.get('/appointments');
            setAppointments(data);
        } catch (error) {
            console.error("Failed to fetch appointments", error);
            toast.error("Failed to load appointments");
        }
    };

    const fetchProfile = async () => {
        try {
            const { data } = await API.get('/doctors/profile');
            // Ensure we have all days
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const defaultSchedules = days.map(day => ({
                day,
                startTime: '09:00',
                endTime: '17:00',
                isAvailable: false
            }));

            const mergedSchedules = defaultSchedules.map(def => {
                const existing = data.schedules.find((s: Schedule) => s.day === def.day);
                return existing ? { ...def, ...existing } : def;
            });

            setSchedules(mergedSchedules);
        } catch (error) {
            console.error("Failed to fetch profile", error);
        }
    };

    useEffect(() => {
        if (user) {
            Promise.all([fetchAppointments(), fetchProfile()]).finally(() => setLoading(false));
        }
    }, [user]);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await API.put(`/appointments/${id}`, { status: newStatus });
            toast.success(`Appointment ${newStatus} successfully`);
            fetchAppointments(); // Refresh list
        } catch (error) {
            console.error("Failed to update status", error);
            toast.error("Failed to update appointment status");
        }
    };

    const handleScheduleChange = (index: number, field: keyof Schedule, value: any) => {
        const newSchedules = [...schedules];
        newSchedules[index] = { ...newSchedules[index], [field]: value };
        setSchedules(newSchedules);
    };

    const saveSchedule = async () => {
        setSavingSchedule(true);
        try {
            await API.post('/doctors/profile', { schedules });
            toast.success("Schedule updated successfully!");
        } catch (error) {
            console.error("Failed to save schedule", error);
            toast.error("Failed to save schedule");
        } finally {
            setSavingSchedule(false);
        }
    };

    // Calendar Helpers
    const getCalendarDays = () => {
        const start = startOfWeek(startOfMonth(currentMonth));
        const end = endOfWeek(endOfMonth(currentMonth));
        return eachDayOfInterval({ start, end });
    };

    const getDailyAppointments = (date: Date) => {
        return appointments.filter(a => isSameDay(new Date(a.date), date) && a.status !== 'cancelled');
    };

    const stats = {
        total: appointments.length,
        today: appointments.filter(apt => new Date(apt.date).toDateString() === new Date().toDateString()).length,
        pending: appointments.filter(apt => apt.status === 'booked').length
    };

    if (loading) return <div className="p-8 text-center flex justify-center items-center"><FaSpinner className="animate-spin mr-2" /> Loading dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Doctor Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Appointments</p>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</h3>
                        </div>
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                            <FaCalendarCheck />
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Today's Schedule</p>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.today}</h3>
                        </div>
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                            <FaClock />
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.pending}</h3>
                        </div>
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full">
                            <FaUserInjured />
                        </div>
                    </div>
                </div>
            </div>

            <TabGroup>
                <TabList className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
                    {['Appointments', 'Availability & Schedule', 'Work Calendar'].map(tab => (
                        <Tab key={tab} className={({ selected }) =>
                            clsx(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }>
                            {tab}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {/* Appointments Table */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Appointments</h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-xs uppercase font-semibold">
                                        <tr>
                                            <th className="px-6 py-4">Patient</th>
                                            <th className="px-6 py-4">Date & Time</th>
                                            <th className="px-6 py-4">Symptom/Reason</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {appointments.length > 0 ? (
                                            appointments.map((apt) => (
                                                <tr key={apt._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mr-3">
                                                                {apt.patient?.user?.name?.charAt(0) || 'P'}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{apt.patient?.user?.name || 'Unknown'}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">{apt.patient?.phone}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 dark:text-white font-medium">
                                                            {format(new Date(apt.date), 'MMM d, yyyy')}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            {apt.time}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                        {apt.reason}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${apt.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                            apt.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                                apt.status === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                            }`}>
                                                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                {apt.status === 'booked' && (
                                                                    <>
                                                                        <button
                                                                            onClick={() => handleStatusUpdate(apt._id, 'confirmed')}
                                                                            className="p-1.5 bg-green-100 text-green-600 hover:bg-green-200 rounded-md transition-colors"
                                                                            title="Approve"
                                                                        >
                                                                            <FaCheck className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleStatusUpdate(apt._id, 'cancelled')}
                                                                            className="p-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition-colors"
                                                                            title="Decline"
                                                                        >
                                                                            <FaTimes className="w-4 h-4" />
                                                                        </button>
                                                                    </>
                                                                )}
                                                                {apt.status === 'confirmed' && (
                                                                    <button
                                                                        onClick={() => handleStatusUpdate(apt._id, 'completed')}
                                                                        className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 transition-colors"
                                                                    >
                                                                        Mark Completed
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400 italic">
                                                    No upcoming appointments found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {/* Profile/Schedule Settings */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Weekly Schedule</h2>
                                <button
                                    onClick={saveSchedule}
                                    disabled={savingSchedule}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:bg-gray-400"
                                >
                                    {savingSchedule ? <FaSpinner className="animate-spin" /> : <FaSave />} Save Schedule
                                </button>
                            </div>
                            <div className="space-y-4">
                                {schedules.map((schedule, index) => (
                                    <div key={schedule.day} className={`p-4 rounded-lg border flex flex-col md:flex-row items-center gap-4 transition-colors ${schedule.isAvailable ? 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30' : 'border-gray-100 dark:border-gray-700 opacity-60 bg-gray-50/50'}`}>
                                        <div className="w-32 font-medium text-gray-700 dark:text-gray-300">
                                            {schedule.day}
                                        </div>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={schedule.isAvailable}
                                                onChange={(e) => handleScheduleChange(index, 'isAvailable', e.target.checked)}
                                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
                                        </label>

                                        {schedule.isAvailable && (
                                            <div className="flex items-center gap-2 ml-4">
                                                <input
                                                    type="time"
                                                    value={schedule.startTime}
                                                    onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                                                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                                <span className="text-gray-400">-</span>
                                                <input
                                                    type="time"
                                                    value={schedule.endTime}
                                                    onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                                                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {/* Work Calendar */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                    <FaCalendarAlt className="text-blue-500" /> Work Calendar
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"><FaChevronLeft /></button>
                                    <span className="font-bold text-gray-700 dark:text-gray-200 text-lg">{format(currentMonth, 'MMMM yyyy')}</span>
                                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"><FaChevronRight /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="bg-gray-50 dark:bg-gray-700/50 p-2 text-center text-xs font-bold text-gray-500 uppercase">
                                        {day}
                                    </div>
                                ))}
                                {getCalendarDays().map((date, idx) => {
                                    const dailyApts = getDailyAppointments(date);
                                    const isCurrentMonth = isSameMonth(date, currentMonth);
                                    const isToday = isSameDay(date, new Date());

                                    return (
                                        <div
                                            key={idx}
                                            className={clsx(
                                                "min-h-[100px] bg-white dark:bg-gray-800 p-2 relative transition-colors hover:bg-gray-50 dark:hover:bg-gray-700",
                                                !isCurrentMonth && "bg-gray-50/50 dark:bg-gray-900/50 text-gray-400"
                                            )}
                                        >
                                            <div className={clsx(
                                                "text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full",
                                                isToday ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300"
                                            )}>
                                                {format(date, 'd')}
                                            </div>

                                            <div className="space-y-1 mt-1">
                                                {dailyApts.map(apt => (
                                                    <div key={apt._id} className="text-[10px] p-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 truncate border-l-2 border-blue-500">
                                                        {apt.time} - {apt.patient.user.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
};

export default DoctorDashboard;
