import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaUserMd } from 'react-icons/fa';

const Login = () => {
    const [activeTab, setActiveTab] = useState('patient'); // 'patient' or 'doctor'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userData = await login(email, password);

            // Role Verification
            if (activeTab === 'patient' && userData.role !== 'patient') {
                await logout();
                throw new Error('Access Denied: Please use the Doctor login for medical staff accounts.');
            }

            if (activeTab === 'doctor' && userData.role !== 'doctor' && userData.role !== 'staff') {
                await logout();
                throw new Error('Access Denied: Please use the Patient login for patient accounts.');
            }

            toast.success(`Welcome back, ${userData.name}! 👋`);
            navigate('/dashboard');
        } catch (err) {
            const message = err.message || 'Invalid email or password';
            setError(message);
            toast.error(message);
            if (err.message && err.message.includes('Access Denied')) {
                // Determine if we need to clear local storage manually if logout didn't fully clean up in a way that affects this render cycle immediately
                // But logout() should handle it.
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 transition-colors">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md transition-colors border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                    {activeTab === 'patient' ? 'Patient Portal' : 'Doctor Portal'}
                </h2>

                {/* Tabs */}
                <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => { setActiveTab('patient'); setError(''); }}
                        className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'patient'
                                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                    >
                        <FaUser className="mr-2" /> Patient
                    </button>
                    <button
                        type="button"
                        onClick={() => { setActiveTab('doctor'); setError(''); }}
                        className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'doctor'
                                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                    >
                        <FaUserMd className="mr-2" /> Doctor
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r" role="alert">
                        <p className="font-bold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md flex items-center justify-center"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400">
                        Register
                    </Link>
                </p>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 text-center">Demo Credentials</p>
                    <div className="grid grid-cols-1 gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex justify-between">
                            <span className="font-medium">Patient:</span>
                            <span className="font-mono">patient@example.com / password123</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Doctor:</span>
                            <span className="font-mono">doctor@example.com / password123</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
