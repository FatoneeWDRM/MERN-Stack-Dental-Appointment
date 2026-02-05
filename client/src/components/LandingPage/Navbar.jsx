import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import skeletonXray from '../../assets/skeleton-xray.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Close menu when clicking a link
    const handleLinkClick = () => setIsOpen(false);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl px-6 py-3 max-w-6xl w-full relative border border-white/50">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        {/* Logo with spine icon */}
                        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50 flex-shrink-0">
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

                    {/* Desktop Menu */}
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

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-600 hover:text-teal-600 focus:outline-none p-2"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-full left-0 right-0 mt-4 mx-2 p-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl md:hidden flex flex-col space-y-2 border border-white/50 overflow-hidden"
                        >
                            {['Services', 'Booking', 'Review', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={handleLinkClick}
                                    className="text-gray-600 hover:text-teal-600 hover:bg-teal-50 font-medium text-base tracking-wide transition py-3 px-4 rounded-xl block"
                                >
                                    {item}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
};

export default Navbar;
