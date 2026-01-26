import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import API from '../api';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            try {
                setUser(JSON.parse(userInfo));
            } catch (error) {
                console.error("Failed to parse user info:", error);
                localStorage.removeItem('userInfo');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const { data } = await API.post('/auth/login', { email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        setUser(data);
    };

    const register = async (name: string, email: string, password: string, role: string) => {
        const { data } = await API.post('/auth/register', { name, email, password, role });
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
