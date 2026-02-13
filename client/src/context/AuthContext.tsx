import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import API, { setAccessToken } from '../api';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Check for existing session on mount (Silent Refresh)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Try to refresh token using the HttpOnly cookie
                const { data } = await API.get('/auth/refresh');

                // If successful, set the new access token in memory
                setAccessToken(data.token);

                // Fetch user profile
                const profileRes = await API.get('/auth/profile');
                setUser(profileRes.data);
            } catch (error) {
                // If refresh fails, user is not logged in
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const { data } = await API.post('/auth/login', { email, password });

        // Backend now sets HttpOnly cookie for Refresh Token
        // Frontend only stores Access Token in memory
        setAccessToken(data.token);

        setUser(data); // data includes user info
        return data;
    };

    const register = async (name: string, email: string, password: string, role: string) => {
        const { data } = await API.post('/auth/register', { name, email, password, role });

        setAccessToken(data.token);
        setUser(data);
        return data;
    };

    const logout = async () => {
        try {
            await API.post('/auth/logout'); // Clear cookie on server
        } catch (error) {
            console.error("Logout failed", error);
        }
        setAccessToken(null);
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
