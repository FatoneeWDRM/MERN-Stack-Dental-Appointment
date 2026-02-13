import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="w-64 bg-white dark:bg-gray-900 h-screen border-r border-gray-200 dark:border-gray-700 flex flex-col fixed left-0 top-0 transition-colors">
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-wide">JKD Clinic</h1>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {isDark ? (
                        <HiSun className="w-5 h-5 text-yellow-400" />
                    ) : (
                        <HiMoon className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>

            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold mr-3 flex-shrink-0">
                        {user?.name?.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    <li>
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) => `flex items-center px-6 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}`}
                        >
                            <span className="mr-3">📊</span>
                            Dashboard
                        </NavLink>
                    </li>

                    {user?.role === 'patient' && (
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/book-appointment"
                                    className={({ isActive }) => `flex items-center px-6 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}`}
                                >
                                    <span className="mr-3">📅</span>
                                    Book Appointment
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/appointments"
                                    className={({ isActive }) => `flex items-center px-6 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}`}
                                >
                                    <span className="mr-3">📋</span>
                                    My Appointments
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
