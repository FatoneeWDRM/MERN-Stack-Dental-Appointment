import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import skeletonXray from '../../assets/skeleton-xray.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
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
                y: isScrolled ? 24 : 0,
                paddingLeft: isScrolled ? 16 : 0,
                paddingRight: isScrolled ? 16 : 0,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 right-0 z-50 flex justify-center"
        >
            <motion.nav
                layout
                initial={false}
                animate={{
                    maxWidth: isScrolled ? '1100px' : '1280px', // max-w-6xl to max-w-7xl approx
                    borderRadius: isScrolled ? '2.5rem' : '0rem',
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
                <div className={`flex justify-between items-center w-full transition-all duration-500 ${isScrolled ? 'px-8 py-3' : 'px-4 py-6'
                    }`}>
                    <div className="flex items-center space-x-3">
                        {/* Logo with spine icon */}
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm flex-shrink-0 transition-colors duration-500 ${isScrolled ? 'border-gray-200' : 'border-white/30'
                            }`}>
                            <img
                                src={skeletonXray}
                                alt="JKD Logo"
                                className="w-8 h-8 object-cover opacity-80"
                            />
                        </div>
                        <div className="leading-tight">
                            <span className={`block text-lg font-bold tracking-wide transition-colors duration-500 ${isScrolled ? 'text-gray-900' : 'text-white'
                                }`}>JKD</span>
                            <span className={`block text-[10px] tracking-[0.2em] font-medium uppercase transition-colors duration-500 ${isScrolled ? 'text-gray-500' : 'text-white/70'
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
