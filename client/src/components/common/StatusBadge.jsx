import React from 'react';
import clsx from 'clsx';

const StatusBadge = ({ status }) => {
    return (
        <span className={clsx(
            'px-3 py-1 rounded-full text-xs font-semibold capitalize',
            {
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': status === 'confirmed' || status === 'completed',
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': status === 'pending' || status === 'scheduled',
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': status === 'cancelled',
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400': status === 'in-progress',
            }
        )}>
            {status}
        </span>
    );
};

export default StatusBadge;
