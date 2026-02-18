import React from 'react';
import { motion } from 'framer-motion';
import clinicBg from '../../assets/clinic-bg.png';
import doctorFooter from '../../assets/doctor-footer.png';

const Footer = () => {
    return (
        <footer id="contact" className="relative h-auto py-10 lg:py-0 lg:h-[500px]">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={clinicBg}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-teal-900/40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center justify-center">
                <div className="w-full flex flex-col md:flex-row items-center justify-center relative">
                    {/* Text & Buttons (Centered) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 flex flex-col items-center justify-center text-center py-10 z-20"
                    >
                        <h2 className="text-2xl md:text-5xl font-medium text-white mb-2 drop-shadow-md">
                            สนใจปรึกษาการจัดกระดูก
                        </h2>
                        <h3 className="text-2xl md:text-5xl font-medium text-white mb-8 md:mb-10 drop-shadow-md">
                            ติดต่อเรา
                        </h3>

                        {/* Contact Buttons */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-w-[160px] px-6 py-2 bg-[#0047AB] hover:bg-blue-800 text-white font-bold text-lg rounded-xl transition shadow-lg flex items-center justify-center"
                            >
                                Facebook
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://line.me"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-w-[160px] px-6 py-2 bg-[#44D62C] hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg flex items-center justify-center"
                            >
                                Line
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="tel:0812345678"
                                className="min-w-[200px] px-6 py-2 bg-[#00C300] hover:bg-green-600 text-white font-bold text-lg rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
                            >
                                <span className="transform rotate-90">📞</span>
                                <span>xx-xxx-xxxx</span>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Doctor Image (Absolute Right - Overlapping) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden lg:block absolute bottom-[-115px] right-[-175px] w-[450px] h-[300%]"
                    >
                        <img
                            src={doctorFooter}
                            alt="Doctor"
                            className="h-full object-contain drop-shadow-2xl object-bottom"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Copyright */}
            <div className="absolute bottom-0 left-0 right-0 py-2 text-center text-black/60 text-sm font-medium bg-white/10 backdrop-blur-[2px]">
                © 2026 Design By Arisza Thailand
            </div>
        </footer>
    );
};

export default Footer;
