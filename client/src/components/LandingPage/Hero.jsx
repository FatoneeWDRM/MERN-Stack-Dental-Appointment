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
                <div className="absolute inset-0 bg-slate-900/40"></div>

                {/* Ambient Background Blobs */}
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-20 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow flex flex-col justify-center w-full">
                <div className="flex flex-col lg:flex-row items-center pt-24 lg:pt-20 pb-10 lg:pb-0 flex-grow">
                    {/* Doctor Image - Left/Center */}
                    <div className="w-full lg:w-[45%] flex justify-center lg:justify-start items-end lg:h-full relative order-2 lg:order-1 mt-8 lg:mt-0">
                        <motion.img
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            src={doctorImage}
                            alt="Doctor"
                            className="h-[50vh] md:h-[60vh] lg:h-[85vh] object-contain object-bottom drop-shadow-2xl"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-[55%] text-left lg:pl-10 pb-10 lg:pb-20 order-1 lg:order-2">
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6 drop-shadow-lg"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-400">JKD CLINIC</span> | คลินิกจัดกระดูก
                        </motion.h1>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-xl leading-relaxed font-light drop-shadow-md"
                        >
                            ด้วยประสบการณ์กว่า 16 ปี ที่นายแพทย์ต่อ มุ่งมั่นในการพัฒนาการบริการ
                            และเครื่องมือที่ทันสมัย เพื่อผู้ใช้บริการจะได้รับประสบการณ์ที่ดีที่สุดกลับไป
                        </motion.p>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                to="/register"
                                className="px-6 md:px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg text-sm md:text-base"
                            >
                                ติดต่อจองคิว
                            </Link>
                            <a
                                href="#services"
                                className="px-6 md:px-8 py-3 bg-transparent text-white border border-white font-medium rounded-xl hover:bg-white/10 transition backdrop-blur-sm text-sm md:text-base"
                            >
                                สอบถามบริการ
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Stats Bar - Responsive positioning */}
            <div className="relative z-20 pb-10 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                        {/* Stats Card */}
                        <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 border-2 border-blue-400/50 rounded-2xl pointer-events-none"></div>

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 text-white divide-y md:divide-y-0 md:divide-x divide-white/30">
                                <div className="text-center w-full pb-4 md:pb-0 md:px-4">
                                    <div className="text-lg md:text-2xl font-bold mb-1">สถิติการรักษา</div>
                                    <div className="text-sm opacity-90">จากผู้ใช้บริการ <span className="text-xl md:text-2xl font-bold mx-1"><CountUp to={1500} /> +</span> คน</div>
                                </div>
                                <div className="text-center w-full py-4 md:py-0 md:px-4">
                                    <div className="text-sm opacity-90 mb-1">ความพึงพอใจจากลูกค้า</div>
                                    <div className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2">
                                        5.0 <span className="text-yellow-400 text-lg">★★★★★</span>
                                    </div>
                                </div>
                                <div className="text-center w-full pt-4 md:pt-0 md:px-4">
                                    <div className="text-sm opacity-90 mb-1">การบอกต่อ</div>
                                    <div className="text-2xl md:text-3xl font-bold"><CountUp to={100} /> + <span className="text-xs font-normal">ครั้ง</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Review CTA */}
                        <div className="lg:w-[350px] bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 flex items-center justify-between text-white hover:bg-white/30 transition cursor-pointer shadow-2xl">
                            <div>
                                <div className="font-bold text-lg mb-1">รับชมรีวิวจากลูกค้าของเรา</div>
                                <div className="text-xs opacity-80">JKD ได้รับความไว้วางใจจากลูกค้ากว่า 1,500 เคส</div>
                            </div>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 transform -rotate-45 shrink-0">
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
