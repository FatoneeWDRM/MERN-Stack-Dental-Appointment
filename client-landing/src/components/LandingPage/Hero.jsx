import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, animate } from 'framer-motion';
import clinicBg from '../../assets/clinic-bg.png';
import doctorImage from '../../assets/doctor.png';

const CountUp = ({ from = 0, to }) => {
    const nodeRef = useRef();

    useEffect(() => {
        const node = nodeRef.current;
        const controls = animate(from, to, {
            duration: 2,
            ease: "easeOut",
            onUpdate(value) {
                if (node) node.textContent = Math.floor(value).toLocaleString();
            }
        });
        return () => controls.stop();
    }, [from, to]);

    return <span ref={nodeRef} />;
};

const Hero = () => {
    return (
        <section className="relative min-h-screen overflow-hidden flex flex-col">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <img
                        src={clinicBg}
                        alt="Clinic Background"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70"></div>

                {/* Ambient Background Blobs - Smaller on mobile */}
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-0 w-64 md:w-96 h-64 md:h-96 bg-teal-500/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 right-0 w-48 md:w-80 h-48 md:h-80 bg-blue-500/30 rounded-full blur-3xl"
                />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow flex flex-col justify-center w-full pt-20 md:pt-24">

                {/* Mobile: Text first, then Doctor image */}
                {/* Desktop: Doctor left, Text right */}
                <div className="flex flex-col lg:flex-row items-center lg:items-center flex-grow gap-4 lg:gap-0">

                    {/* Text Content - Always first on mobile */}
                    <div className="w-full lg:w-[55%] text-center lg:text-left lg:pl-10 order-1 lg:order-2 py-6 lg:py-0">
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 md:mb-6 drop-shadow-lg"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-400">JKD CLINIC</span>
                            <br className="sm:hidden" />
                            <span className="hidden sm:inline"> | </span>
                            <span className="text-xl sm:text-3xl md:text-5xl lg:text-6xl">คลินิกจัดกระดูก</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-white/90 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light drop-shadow-md"
                        >
                            ด้วยประสบการณ์กว่า 16 ปี ที่นายแพทย์ต่อ มุ่งมั่นในการพัฒนาการบริการ
                            และเครื่องมือที่ทันสมัย เพื่อผู้ใช้บริการจะได้รับประสบการณ์ที่ดีที่สุดกลับไป
                        </motion.p>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                to="/register"
                                className="px-6 md:px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-xl hover:from-teal-600 hover:to-teal-700 transition shadow-lg shadow-teal-500/30 text-sm md:text-base text-center"
                            >
                                ติดต่อจองคิว
                            </Link>
                            <a
                                href="#services"
                                className="px-6 md:px-8 py-3 bg-white/10 text-white border border-white/30 font-medium rounded-xl hover:bg-white/20 transition backdrop-blur-sm text-sm md:text-base text-center"
                            >
                                สอบถามบริการ
                            </a>
                        </motion.div>
                    </div>

                    {/* Doctor Image - Second on mobile, left on desktop */}
                    <div className="w-full lg:w-[45%] flex justify-center items-end order-2 lg:order-1">
                        <motion.img
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            src={doctorImage}
                            alt="Doctor"
                            className="h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[75vh] object-contain object-bottom drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Bar - Mobile optimized */}
            <div className="relative z-20 pb-6 md:pb-10 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="flex flex-col lg:flex-row gap-3 lg:gap-6">
                        {/* Stats Card - Horizontal scroll on mobile */}
                        <div className="flex-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 relative overflow-hidden shadow-2xl">
                            <div className="relative z-10 flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-0 text-white md:divide-x divide-white/20 no-scrollbar">
                                <div className="text-center min-w-[140px] md:min-w-0 flex-shrink-0 md:px-4">
                                    <div className="text-xs md:text-sm opacity-80 mb-1">ผู้ใช้บริการ</div>
                                    <div className="text-xl md:text-2xl font-bold">
                                        <CountUp to={1500} />+
                                    </div>
                                </div>
                                <div className="text-center min-w-[140px] md:min-w-0 flex-shrink-0 md:px-4">
                                    <div className="text-xs md:text-sm opacity-80 mb-1">ความพึงพอใจ</div>
                                    <div className="text-xl md:text-2xl font-bold flex items-center justify-center gap-1">
                                        5.0 <span className="text-yellow-400 text-sm md:text-base">★</span>
                                    </div>
                                </div>
                                <div className="text-center min-w-[140px] md:min-w-0 flex-shrink-0 md:px-4">
                                    <div className="text-xs md:text-sm opacity-80 mb-1">ประสบการณ์</div>
                                    <div className="text-xl md:text-2xl font-bold">16+ ปี</div>
                                </div>
                            </div>
                        </div>

                        {/* Review CTA - Hidden on small mobile, visible from sm */}
                        <div className="hidden sm:flex lg:w-[320px] bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 items-center justify-between text-white hover:bg-white/25 transition cursor-pointer shadow-2xl group">
                            <div>
                                <div className="font-bold text-sm md:text-base mb-1">รับชมรีวิวจากลูกค้า</div>
                                <div className="text-xs opacity-70">1,500+ เคสที่ไว้วางใจ</div>
                            </div>
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-gray-900 transform -rotate-45 shrink-0 group-hover:rotate-0 transition-transform">
                                ➜
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
