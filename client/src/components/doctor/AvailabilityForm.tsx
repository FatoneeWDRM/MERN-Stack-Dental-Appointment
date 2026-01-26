import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../../api';
import { Schedule } from '../../types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityForm = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([
        { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Friday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Saturday', startTime: '09:00', endTime: '12:00', isAvailable: false },
        { day: 'Sunday', startTime: '09:00', endTime: '12:00', isAvailable: false },
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await API.get('/doctors/profile');
                if (data.schedules && data.schedules.length > 0) {
                    setSchedules(data.schedules);
                }
            } catch (error) {
                console.error('Failed to load doctor profile');
            }
        };
        fetchProfile();
    }, []);

    const checkSchedule = (day: string) => schedules.find(s => s.day === day);

    const handleToggle = (day: string) => {
        setSchedules(prev => {
            const exists = prev.find(s => s.day === day);
            if (exists) {
                return prev.map(s => s.day === day ? { ...s, isAvailable: !s.isAvailable } : s);
            } else {
                return [...prev, { day, startTime: '09:00', endTime: '17:00', isAvailable: true }];
            }
        });
    };

    const handleChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
        setSchedules(prev => prev.map(s => s.day === day ? { ...s, [field]: value } : s));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await API.post('/doctors/profile', { schedules }); // Simplified, assuming this endpoint updates schedules
            toast.success('Availability updated successfully');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update schedule');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Working Hours</h2>
            <div className="space-y-4">
                {DAYS.map(day => {
                    const schedule = checkSchedule(day);
                    const isAvailable = schedule?.isAvailable || false;

                    return (
                        <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3 w-32">
                                <input
                                    type="checkbox"
                                    checked={isAvailable}
                                    onChange={() => handleToggle(day)}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="font-medium text-gray-700">{day}</span>
                            </div>

                            {isAvailable && schedule && (
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="time"
                                        value={schedule.startTime}
                                        onChange={(e) => handleChange(day, 'startTime', e.target.value)}
                                        className="border-gray-300 rounded-md text-sm"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="time"
                                        value={schedule.endTime}
                                        onChange={(e) => handleChange(day, 'endTime', e.target.value)}
                                        className="border-gray-300 rounded-md text-sm"
                                    />
                                </div>
                            )}
                            {!isAvailable && <span className="text-gray-400 text-sm italic">Day Off</span>}
                        </div>
                    );
                })}
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Schedule'}
                </button>
            </div>
        </div>
    );
};

export default AvailabilityForm;
