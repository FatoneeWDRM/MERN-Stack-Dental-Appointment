import { useAuth } from '../context/AuthContext';
import DoctorDashboard from './doctor/DoctorDashboard';
import PatientDashboard from './patient/PatientDashboard';

const Dashboard = () => {
    const { user } = useAuth();

    if (user?.role === 'doctor') {
        return <DoctorDashboard />;
    }

    if (user?.role === 'patient') {
        return <PatientDashboard />;
    }

    return (
        <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Access Denied or Unknown Role</h2>
            <p className="text-gray-500 mt-2">Please contact support if you believe this is an error.</p>
        </div>
    );
};

export default Dashboard;
