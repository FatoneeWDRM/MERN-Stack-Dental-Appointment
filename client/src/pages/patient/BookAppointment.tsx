import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import { FaUserMd, FaCalendarAlt, FaClock, FaCheckCircle, FaChevronRight, FaInfoCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { format, addDays, startOfToday, parseISO } from 'date-fns';
import clsx from 'clsx';

interface Schedule {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

interface Doctor {
    _id: string;
    user: { name: string; email: string };
    specialization: string;
    feesPerConsultation: number;
    schedules: Schedule[];
    experience?: number;
}

const BookAppointment = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    // Appointment Data
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [reason, setReason] = useState('');

    // UI States
    const [loading, setLoading] = useState(false);
    const [fetchingSlots, setFetchingSlots] = useState(false);
    const [step, setStep] = useState(1); // 1: Select Doctor, 2: Select Date/Time/Reason

    // Fetch Doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await API.get('/doctors');
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors", error);
                toast.error("Failed to load specialists");
            }
        };
        fetchDoctors();
    }, []);

    // Fetch Slots
    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            const fetchSlots = async () => {
                setFetchingSlots(true);
                try {
                    const { data } = await API.get(`/doctors/${selectedDoctor._id}/slots?date=${selectedDate}`);
                    setAvailableSlots(data);
                } catch (error) {
                    console.error("Error fetching slots", error);
                    toast.error("Could not check availability");
                    setAvailableSlots([]);
                } finally {
                    setFetchingSlots(false);
                }
            };
            fetchSlots();
        } else {
            setAvailableSlots([]);
        }
    }, [selectedDoctor, selectedDate]);

    const handleDoctorSelect = (doc: Doctor) => {
        setSelectedDoctor(doc);
        setSelectedDate('');
        setSelectedTime('');
        setAvailableSlots([]);
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDoctor || !selectedDate || !selectedTime || !reason) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await API.post('/appointments', {
                doctorId: selectedDoctor._id,
                date: selectedDate,
                time: selectedTime,
                reason
            });
            toast.success("Appointment booked successfully!");
            navigate('/dashboard');
        } catch (error: any) {
            console.error("Booking error", error);
            toast.error(error.response?.data?.message || "Failed to book appointment");
        } finally {
            setLoading(false);
        }
    };

    const getAvailableDays = (doc: Doctor) => {
        if (!doc.schedules || doc.schedules.length === 0) return "No schedule set";
        const available = doc.schedules.filter(s => s.isAvailable);
        if (available.length === 0) return "Temporarily Unavailable";

        // Group consecutive days or just list them (Simple listing for now)
        // e.g., "Mon, Wed, Fri"
        const shortDays = available.map(s => s.day.substring(0, 3));
        return shortDays.join(', ');
    };

    // Helper to check if a date is selectable based on doctor's schedule
    const isDateAvailable = (dateStr: string) => {
        if (!selectedDoctor) return false;
        const date = parseISO(dateStr);
        const dayName = format(date, 'EEEE'); // "Monday", "Tuesday"...
        const schedule = selectedDoctor.schedules.find(s => s.day === dayName);
        return schedule ? schedule.isAvailable : false;
    };

    // Small calendar generator (Next 14 days)
    const generateCalendarDates = () => {
        const dates = [];
        const today = startOfToday();
        for (let i = 0; i < 14; i++) {
            dates.push(addDays(today, i));
        }
        return dates;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Book an Appointment</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Select a specialist and find a time that works for you.</p>

            {/* Stepper / Progress */}
            <div className="flex items-center gap-4 mb-8 text-sm font-medium">
                <button
                    onClick={() => setStep(1)}
                    className={clsx("flex items-center gap-2 px-3 py-1 rounded-full transition-colors", step === 1 ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700")}
                >
                    <span className="w-6 h-6 rounded-full bg-current text-white flex items-center justify-center text-xs">1</span>
                    Select Specialist
                </button>
                <FaChevronRight className="text-gray-300" />
                <div className={clsx("flex items-center gap-2 px-3 py-1 rounded-full transition-colors", step === 2 ? "bg-blue-100 text-blue-700" : "text-gray-400")}>
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">2</span>
                    Schedule & Details
                </div>
            </div>

            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doc) => (
                        <div
                            key={doc._id}
                            onClick={() => handleDoctorSelect(doc)}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 cursor-pointer transition-all hover:shadow-md group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <FaChevronRight className="text-blue-500" />
                            </div>

                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center text-2xl">
                                    <FaUserMd />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{doc.user.name}</h3>
                                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{doc.specialization}</p>
                                    <p className="text-xs text-gray-500 mt-1">{doc.experience || 5}+ years exp</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Availability</p>
                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <span>{getAvailableDays(doc)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {step === 2 && selectedDoctor && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animation-fade-in">

                    {/* Left Col: Doctor Info & Calendar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Selected Doctor Summary */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                                    <FaUserMd />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{selectedDoctor.user.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedDoctor.specialization}</p>
                                </div>
                                <button onClick={() => setStep(1)} className="ml-auto text-sm text-blue-600 hover:underline">Change</button>
                            </div>
                            <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                                <div className="flex justify-between">
                                    <span>Consultation Fee:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">${selectedDoctor.feesPerConsultation}</span>
                                </div>
                            </div>
                        </div>

                        {/* Date Selection (Custom Mini Calendar) */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaCalendarAlt className="text-blue-500" /> Select Date
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                                {generateCalendarDates().map(date => {
                                    const dateStr = format(date, 'yyyy-MM-dd');
                                    const isAvailable = isDateAvailable(dateStr);
                                    const isSelected = selectedDate === dateStr;

                                    return (
                                        <button
                                            key={dateStr}
                                            disabled={!isAvailable}
                                            onClick={() => { setSelectedDate(dateStr); setSelectedTime(''); }}
                                            className={clsx(
                                                "flex flex-col items-center justify-center p-2 rounded-xl text-sm transition-all border",
                                                isSelected
                                                    ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105"
                                                    : isAvailable
                                                        ? "bg-white dark:bg-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                                                        : "bg-gray-50 dark:bg-gray-800 border-transparent text-gray-300 cursor-not-allowed"
                                            )}
                                        >
                                            <span className="text-xs font-medium uppercase">{format(date, 'EEE')}</span>
                                            <span className="text-lg font-bold">{format(date, 'd')}</span>
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-xs text-gray-400 mt-4 text-center">Showing availability for the next 2 weeks</p>
                        </div>
                    </div>

                    {/* Right Col: Time Slots & Form */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Time Selection */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaClock className="text-blue-500" /> Select Time
                            </h3>

                            {!selectedDate ? (
                                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
                                    <FaCalendarAlt className="mx-auto text-2xl mb-2 opacity-20" />
                                    Please select a date first
                                </div>
                            ) : fetchingSlots ? (
                                <div className="text-center py-8 text-blue-500">
                                    <FaCheckCircle className="mx-auto text-2xl mb-2 animate-bounce" />
                                    Checking availability...
                                </div>
                            ) : availableSlots.length === 0 ? (
                                <div className="text-center py-8 text-red-500 bg-red-50 rounded-xl">
                                    No available slots for this date.
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {availableSlots.map(slot => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedTime(slot)}
                                            className={clsx(
                                                "py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                                selectedTime === slot
                                                    ? "bg-blue-600 text-white shadow-md transform scale-105"
                                                    : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 hover:text-blue-700"
                                            )}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details & Submit */}
                        <div className={clsx("bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500", !selectedTime && "opacity-50 pointer-events-none grayscale")}>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaInfoCircle className="text-blue-500" /> Final Details
                            </h3>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason for Visit</label>
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Briefly describe your symptoms or reason for visit..."
                                    className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px]"
                                ></textarea>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? "Processing..." : "Confirm Appointment"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookAppointment;
