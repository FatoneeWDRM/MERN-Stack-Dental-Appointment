import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import skeletonXray from '../../assets/skeleton-xray.png'; // No longer needed for logo

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking a link
    const handleLinkClick = () => setIsOpen(false);

    return (
        <motion.div
            layout
            initial={false}
            animate={{
                y: 24,
                paddingLeft: 16,
                paddingRight: 16,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 right-0 z-50 flex justify-center"
        >
            <motion.nav
                layout
                initial={false}
                animate={{
                    maxWidth: '1200px',
                    borderRadius: '2.5rem',
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0)',
                    backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
                    boxShadow: isScrolled
                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        : '0 0px 0px 0px rgba(0, 0, 0, 0)',
                    borderBottomWidth: isScrolled ? '1px' : '0px',
                    borderColor: isScrolled ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0)',
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center w-full overflow-hidden"
            >
                <div className={`flex justify-between items-center w-full transition-all duration-500 px-8 py-3`}>
                    <div className="flex items-center space-x-3">
                        {/* Custom SVG Spine/Bone Logo */}
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm flex-shrink-0 transition-all duration-500 group-hover:scale-110 ${isScrolled ? 'border-teal-100 bg-teal-50/50' : 'border-white/30'
                            }`}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`w-7 h-7 transition-colors duration-500 ${isScrolled ? 'text-teal-600' : 'text-teal-300'
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 3V5M12 19V21M12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7ZM12 7V3M12 21V15M7 11H3M21 11H17M18.364 17.364L15.5355 14.5355M8.46447 7.46447L5.63604 4.63604M18.364 4.63604L15.5355 7.46447M8.46447 14.5355L5.63604 17.364"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div className="leading-tight group">
                            <span className={`block text-lg font-bold tracking-tight transition-colors duration-500 ${isScrolled ? 'text-slate-900 group-hover:text-teal-600' : 'text-white'
                                }`}>BETTERBONE</span>
                            <span className={`block text-[10px] tracking-[0.3em] font-semibold uppercase transition-colors duration-500 ${isScrolled ? 'text-teal-600/70' : 'text-teal-300'
                                }`}>CLINIC</span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Services', 'Booking', 'Review', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`font-medium text-sm tracking-wide transition-all duration-300 ${isScrolled
                                    ? 'text-gray-600 hover:text-teal-600'
                                    : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden focus:outline-none p-2 transition-colors duration-500 ${isScrolled ? 'text-gray-600' : 'text-white'
                            }`}
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
            </motion.nav>
        </motion.div>
    );
};

export default Navbar;
