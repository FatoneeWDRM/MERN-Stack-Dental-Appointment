import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clinicBg from '../../assets/clinic-bg.png';
import doctorImage from '../../assets/doctor.png';

const Hero = () => {
    return (
        <section className="relative h-screen min-h-[700px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
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
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
                <div className="flex flex-col lg:flex-row items-center h-full pt-20">
                    {/* Doctor Image - Left/Center */}
                    <div className="w-full lg:w-[45%] flex justify-center lg:justify-start items-end h-full relative">
                        <motion.img
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            src={doctorImage}
                            alt="Doctor"
                            className="h-[85vh] object-contain object-bottom drop-shadow-2xl"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-[55%] text-left lg:pl-10 pb-20">
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
                        >
                            JKD CLINIC | คลินิกจัดกระดูก
                        </motion.h1>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-white/90 text-lg mb-8 max-w-xl leading-relaxed font-light drop-shadow-md"
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
                                className="px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg"
                            >
                                ติดต่อจองคิว
                            </Link>
                            <a
                                href="#services"
                                className="px-8 py-3 bg-transparent text-white border border-white font-medium rounded-xl hover:bg-white/10 transition backdrop-blur-sm"
                            >
                                สอบถามบริการ
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Stats Bar - Floating Bottom */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute bottom-10 left-4 right-4 lg:left-8 lg:right-8"
                >
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                        {/* Stats Card */}
                        <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 border-2 border-blue-400/50 rounded-2xl"></div>

                            <div className="relative z-10 flex items-center justify-between text-white px-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold mb-1">สถิติการรักษา</div>
                                    <div className="text-sm opacity-90">จากผู้ใช้บริการ <span className="text-2xl font-bold mx-1">1,500 +</span> คน</div>
                                </div>
                                <div className="w-px h-12 bg-white/30"></div>
                                <div className="text-center">
                                    <div className="text-sm opacity-90 mb-1">ความพึงพอใจจากลูกค้า</div>
                                    <div className="text-3xl font-bold flex items-center gap-2">
                                        5.0 <span className="text-yellow-400 text-lg">★★★★★</span>
                                    </div>
                                </div>
                                <div className="w-px h-12 bg-white/30"></div>
                                <div className="text-center">
                                    <div className="text-sm opacity-90 mb-1">การบอกต่อ</div>
                                    <div className="text-3xl font-bold">100 + <span className="text-xs font-normal">ครั้ง</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Review CTA */}
                        <div className="lg:w-[350px] bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 flex items-center justify-between text-white hover:bg-white/30 transition cursor-pointer shadow-2xl">
                            <div>
                                <div className="font-bold text-lg mb-1">รับชมรีวิวจากลูกค้าของเรา</div>
                                <div className="text-xs opacity-80">JKD ได้รับความไว้วางใจจากลูกค้ากว่า 1,500 เคส</div>
                            </div>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 transform -rotate-45">
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
