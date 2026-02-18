import React from 'react';
import { motion } from 'framer-motion';
import skeletonXray from '../../assets/skeleton-xray.png';
import { FaXRay, FaBone, FaUserMd, FaLaptopMedical, FaHeartbeat, FaWalking } from 'react-icons/fa';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

const services = [
    {
        title: 'ตรวจกระดูกสันหลัง',
        desc: 'ตรวจวิเคราะห์โครงสร้างกระดูกสันหลังอย่างละเอียด เพื่อค้นหาสาเหตุของอาการปวดที่แท้จริง',
        icon: FaXRay,
        color: 'from-teal-400 to-teal-600'
    },
    {
        title: 'จัดกระดูก',
        desc: 'ปรับโครงสร้างกระดูกและข้อต่อให้กลับสู่ตำแหน่งที่ถูกต้อง ลดการกดทับเส้นประสาท โดยผู้เชี่ยวชาญ',
        icon: FaBone,
        color: 'from-blue-400 to-blue-600'
    },
    {
        title: 'กายภาพบำบัด',
        desc: 'บำบัดฟื้นฟูกล้ามเนื้อและเส้นเอ็น ด้วยเครื่องมือทางกายภาพที่ทันสมัย ลดอาการปวดและอักเสบ',
        icon: FaUserMd,
        color: 'from-emerald-400 to-emerald-600'
    },
    {
        title: 'ออฟฟิศซินโดรม',
        desc: 'รักษาอาการปวดคอ บ่า ไหล่ จากการทำงานหรือนั่งผิดท่าเป็นเวลานาน อย่างตรงจุด',
        icon: FaLaptopMedical,
        color: 'from-cyan-400 to-cyan-600'
    },
    {
        title: 'รักษาอาการปวด',
        desc: 'ดูแลรักษาอาการปวดเรื้อรัง ปวดเฉียบพลัน ปวดไมเกรน หรือปวดร้าวลงขา อย่างมีประสิทธิภาพ',
        icon: FaHeartbeat,
        color: 'from-rose-400 to-rose-600'
    },
    {
        title: 'ฟื้นฟูสมรรถภาพ',
        desc: 'โปรแกรมฟื้นฟูร่างกายหลังการบาดเจ็บ หรือหลังผ่าตัด ให้กลับมาใช้งานได้ปกติและแข็งแรงขึ้น',
        icon: FaWalking,
        color: 'from-purple-400 to-purple-600'
    },
];

const Services = () => {
    return (
        <section id="services" className="py-16 md:py-24 bg-white relative overflow-hidden">
            {/* Background skeleton image behind header */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-[0.08] pointer-events-none">
                <img src={skeletonXray} alt="" className="w-full h-full object-contain" />
            </div>

            {/* Subtle ambient blobs */}
            <div className="absolute top-20 -left-32 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 -right-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 relative"
                >
                    {/* Large background text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                        <span className="text-[120px] md:text-[180px] font-black text-teal-50 tracking-wider">
                            JKD
                        </span>
                    </div>

                    <div className="relative z-10">
                        <span className="inline-block px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-semibold mb-4">
                            Our Services
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
                            บริการของ <span className="text-teal-600">JKD CLINIC</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            แหล่งศูนย์แก้ปัญหาของเหล่าคนปวดร่างกายที่จะช่วยบรรเทาความเจ็บปวดให้แก่ทุกท่าน
                            ด้วยการรักษาที่ตรงจุดและทีมแพทย์ผู้เชี่ยวชาญ
                        </p>
                    </div>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-slate-100 hover:shadow-2xl hover:shadow-teal-100/50 border border-slate-100 hover:border-teal-200 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            {/* Background gradient icon watermark */}
                            <div className="absolute -right-6 -bottom-6 text-[120px] text-slate-50 group-hover:text-teal-50 transition-colors duration-500 pointer-events-none">
                                <item.icon />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon with gradient */}
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon />
                                </div>

                                <h4 className="font-bold text-slate-800 text-lg md:text-xl mb-3 group-hover:text-teal-700 transition-colors">
                                    {item.title}
                                </h4>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>

                                {/* Learn more link */}
                                <div className="mt-4 flex items-center text-teal-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span>ดูรายละเอียด</span>
                                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
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
