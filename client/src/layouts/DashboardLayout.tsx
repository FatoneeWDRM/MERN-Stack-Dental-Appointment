import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon, HiUser, HiBell } from 'react-icons/hi';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-gray-900 transition-colors font-sans">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col h-full overflow-hidden">

                {/* Top Header */}
                <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 transition-colors z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            Welcome, {user?.name} 👋
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user?.role === 'patient' ? 'Patient Portal' : 'Doctor Dashboard'}
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Notifications (Mock) */}
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition relative">
                            <HiBell className="w-6 h-6" />
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            {isDark ? (
                                <HiSun className="w-6 h-6 text-yellow-400" />
                            ) : (
                                <HiMoon className="w-6 h-6 text-gray-600" />
                            )}
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                                {user?.name?.charAt(0)}
                            </div>
                            <button onClick={logout} className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400">
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content Scrollable Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-gray-900 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
