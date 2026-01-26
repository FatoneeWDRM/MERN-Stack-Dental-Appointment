import API from './index';

const appointmentService = {
    // Book new appointment
    bookAppointment: async (data) => {
        const response = await API.post('/appointments', data);
        return response.data;
    },

    // Get all appointments (with filters)
    getAppointments: async () => {
        const response = await API.get('/appointments');
        return response.data;
    },

    // Get single appointment (for slip)
    getAppointmentById: async (id) => {
        const response = await API.get(`/appointments/${id}`);
        return response.data;
    },

    // Cancel appointment
    cancelAppointment: async (id) => {
        const response = await API.delete(`/appointments/${id}`);
        return response.data;
    },

    // Update status (Doctor/Admin)
    updateStatus: async (id, status, notes) => {
        const response = await API.put(`/appointments/${id}`, { status, notes });
        return response.data;
    }
};

export default appointmentService;
