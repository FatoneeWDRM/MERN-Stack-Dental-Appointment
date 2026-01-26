import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Appointment } from '../../types';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface DoctorCalendarProps {
    appointments: Appointment[];
}

const DoctorCalendar = ({ appointments }: DoctorCalendarProps) => {
    // Transform appointments to calendar events
    const events = appointments.map(apt => {
        // Parse date and time (e.g., "2023-10-27" and "09:00")
        const [hours, minutes] = apt.time.split(':').map(Number);
        const start = new Date(apt.date);
        start.setHours(hours, minutes, 0, 0);

        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 30); // Assume 30 min duration for visualization

        return {
            title: `${apt.patient.user.name} (${apt.status})`,
            start,
            end,
            resource: apt,
        };
    });

    const eventPropGetter = (event: any) => {
        let className = 'bg-blue-500 text-white border-0';
        if (event.resource.status === 'completed') {
            className = 'bg-emerald-500 text-white border-0';
        } else if (event.resource.status === 'cancelled') {
            className = 'bg-red-500 text-white border-0 opacity-75';
        } else if (event.resource.status === 'booked') {
            className = 'bg-amber-500 text-white border-0';
        }
        return { className };
    };

    return (
        <div className="h-[600px] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={['month', 'week', 'day']}
                defaultView="week"
                min={new Date(0, 0, 0, 8, 0, 0)} // Start at 8 AM
                max={new Date(0, 0, 0, 20, 0, 0)} // End at 8 PM
                eventPropGetter={eventPropGetter}
            />
        </div>
    );
};

export default DoctorCalendar;
