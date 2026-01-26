import React from 'react';

const PasswordStrengthMeter = ({ password }) => {
    const getPasswordStrength = (pass) => {
        let strength = 0;
        if (!pass) return { score: 0, label: '', color: 'bg-gray-200' };

        // Length check
        if (pass.length >= 8) strength++;
        if (pass.length >= 12) strength++;

        // Character variety checks
        if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[^a-zA-Z\d]/.test(pass)) strength++;

        // Map strength to label and color
        if (strength === 0 || strength === 1) {
            return { score: strength, label: 'Weak', color: 'bg-red-500' };
        } else if (strength === 2) {
            return { score: strength, label: 'Fair', color: 'bg-orange-500' };
        } else if (strength === 3) {
            return { score: strength, label: 'Good', color: 'bg-yellow-500' };
        } else {
            return { score: strength, label: 'Strong', color: 'bg-green-500' };
        }
    };

    const strength = getPasswordStrength(password);
    const widthPercentage = (strength.score / 5) * 100;

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${widthPercentage}%` }}
                />
            </div>
            <p className={`text-xs mt-1 font-medium ${strength.label === 'Weak' ? 'text-red-500' :
                    strength.label === 'Fair' ? 'text-orange-500' :
                        strength.label === 'Good' ? 'text-yellow-500' :
                            'text-green-500'
                }`}>
                Password Strength: {strength.label}
            </p>
        </div>
    );
};

export default PasswordStrengthMeter;
