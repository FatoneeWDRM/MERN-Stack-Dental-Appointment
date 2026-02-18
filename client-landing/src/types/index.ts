export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'patient' | 'doctor' | 'admin' | 'staff';
    token?: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, role: string) => Promise<any>;
    logout: () => void;
}

export interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

export interface Schedule {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

export interface Appointment {
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
