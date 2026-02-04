import React from 'react';
import { motion } from 'framer-motion';
import skeletonXray from '../../assets/skeleton-xray.png';

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
        <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Top */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex flex-col items-center justify-center mb-6">
                        <div className="w-24 h-24 mb-4 opacity-20">
                            <img src={skeletonXray} alt="" className="w-full h-full object-contain" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-teal-600 tracking-widest mb-4">
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                >
                    {[
                        { title: 'ตรวจกระดูกสันหลัง', desc: 'ตรวจวิเคราะห์โครงสร้างกระดูกสันหลังอย่างละเอียด เพื่อค้นหาสาเหตุของอาการปวดที่แท้จริง' },
                        { title: 'จัดกระดูก', desc: 'ปรับโครงสร้างกระดูกและข้อต่อให้กลับสู่ตำแหน่งที่ถูกต้อง ลดการกดทับเส้นประสาท โดยผู้เชี่ยวชาญ' },
                        { title: 'กายภาพบำบัด', desc: 'บำบัดฟื้นฟูกล้ามเนื้อและเส้นเอ็น ด้วยเครื่องมือทางกายภาพที่ทันสมัย ลดอาการปวดและอักเสบ' },
                        { title: 'ออฟฟิศซินโดรม', desc: 'รักษาอาการปวดคอ บ่า ไหล่ จากการทำงานหรือนั่งผิดท่าเป็นเวลานาน อย่างตรงจุด' },
                        { title: 'รักษาอาการปวด', desc: 'ดูแลรักษาอาการปวดเรื้อรัง ปวดเฉียบพลัน ปวดไมเกรน หรือปวดร้าวลงขา อย่างมีประสิทธิภาพ' },
                        { title: 'ฟื้นฟูสมรรถภาพ', desc: 'โปรแกรมฟื้นฟูร่างกายหลังการบาดเจ็บ หรือหลังผ่าตัด ให้กลับมาใช้งานได้ปกติและแข็งแรงขึ้น' },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow flex items-center space-x-4 group cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-teal-50 transition-colors flex-shrink-0"></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-teal-600 transition-colors">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
