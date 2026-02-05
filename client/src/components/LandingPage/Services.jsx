import React from 'react';
import { motion } from 'framer-motion';
import skeletonXray from '../../assets/skeleton-xray.png';
import { FaXRay, FaBone, FaUserMd, FaLaptopMedical, FaHeartbeat, FaWalking } from 'react-icons/fa';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

const Services = () => {
    return (
        <section id="services" className="py-12 md:py-20 bg-white relative overflow-hidden">
            {/* Ambient Background Blobs */}
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            />
            <motion.div
                animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Top */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="relative flex flex-col items-center justify-center mb-6">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-40 pointer-events-none">
                            <img src={skeletonXray} alt="" className="w-full h-full object-contain" />
                        </div>
                        <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-teal-600 tracking-widest mb-4">
                            JKD CLINIC
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
                            แหล่งศูนย์แก้ปัญหาของเหล่าคนปวดร่างกายที่จะช่วยบรรเทาความเจ็บปวดให้แก่ทุกท่าน
                            ด้วยการรักษาที่ตรงจุดและทีมแพทย์ผู้เชี่ยวชาญ
                        </p>
                    </div>

                    <div className="mt-16">
                        <h3 className="text-3xl font-bold text-teal-500 mb-2 uppercase tracking-widest">
                            Our Service
                        </h3>
                        <p className="text-gray-300 text-sm">บริการทั้งหมดของ (All Services)</p>
                    </div>
                </motion.div>


                {/* Services Grid (6 Items) */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto"
                >
                    {[
                        {
                            title: 'ตรวจกระดูกสันหลัง',
                            desc: 'ตรวจวิเคราะห์โครงสร้างกระดูกสันหลังอย่างละเอียด เพื่อค้นหาสาเหตุของอาการปวดที่แท้จริง',
                            icon: FaXRay
                        },
                        {
                            title: 'จัดกระดูก',
                            desc: 'ปรับโครงสร้างกระดูกและข้อต่อให้กลับสู่ตำแหน่งที่ถูกต้อง ลดการกดทับเส้นประสาท โดยผู้เชี่ยวชาญ',
                            icon: FaBone
                        },
                        {
                            title: 'กายภาพบำบัด',
                            desc: 'บำบัดฟื้นฟูกล้ามเนื้อและเส้นเอ็น ด้วยเครื่องมือทางกายภาพที่ทันสมัย ลดอาการปวดและอักเสบ',
                            icon: FaUserMd
                        },
                        {
                            title: 'ออฟฟิศซินโดรม',
                            desc: 'รักษาอาการปวดคอ บ่า ไหล่ จากการทำงานหรือนั่งผิดท่าเป็นเวลานาน อย่างตรงจุด',
                            icon: FaLaptopMedical
                        },
                        {
                            title: 'รักษาอาการปวด',
                            desc: 'ดูแลรักษาอาการปวดเรื้อรัง ปวดเฉียบพลัน ปวดไมเกรน หรือปวดร้าวลงขา อย่างมีประสิทธิภาพ',
                            icon: FaHeartbeat
                        },
                        {
                            title: 'ฟื้นฟูสมรรถภาพ',
                            desc: 'โปรแกรมฟื้นฟูร่างกายหลังการบาดเจ็บ หรือหลังผ่าตัด ให้กลับมาใช้งานได้ปกติและแข็งแรงขึ้น',
                            icon: FaWalking
                        },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-teal-100/50 transition-all duration-300 border border-gray-100 hover:border-teal-200 group cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500 opacity-50"></div>

                            <div className="flex items-start space-x-6 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-3xl shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                    <item.icon />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 text-xl mb-3 group-hover:text-teal-700 transition-colors">{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
