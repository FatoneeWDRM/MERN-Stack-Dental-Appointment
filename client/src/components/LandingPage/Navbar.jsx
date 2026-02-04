import React from 'react';
import skeletonXray from '../../assets/skeleton-xray.png';

const Navbar = () => {
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="bg-white rounded-full shadow-lg px-8 py-3 max-w-6xl w-full flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    {/* Logo with spine icon */}
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
                        <img
                            src={skeletonXray}
                            alt="JKD Logo"
                            className="w-8 h-8 object-cover opacity-80"
                        />
                    </div>
                    <div className="leading-tight">
                        <span className="block text-lg font-bold text-gray-900 tracking-wide">JKD</span>
                        <span className="block text-[10px] text-gray-500 tracking-[0.2em] font-medium uppercase">CLINIC</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    {['Services', 'Booking', 'Review', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-gray-600 hover:text-teal-600 font-medium text-sm tracking-wide transition"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
