import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Import all doctor images
import doctorTeam1 from '../../assets/doctor-team-1.png'; // Chiro/Spine
import doctorStanding from '../../assets/doctor-standing.png'; // Sports Med
import doctorTeam2 from '../../assets/doctor-team-2.png'; // Pediatrics
import doctorTeam3 from '../../assets/doctor-team-3.png'; // Rehab
import doctorBooking from '../../assets/doctor-booking.png'; // Ortho/Trauma
import doctor from '../../assets/doctor.png'; // Chiro

// Mock Data for Reviews
const reviewsData = [
    {
        id: 1,
        program: 'Office Syndrome',
        reviewer: 'คุณนลิน (พนักงานออฟฟิศ)',
        rating: 5,
        date: '12 ม.ค. 2024',
        comment: 'ปวดคอ บ่า ไหล่ มานานหลายปี ทานยาก็แค่บรรเทา พอมาจัดกระดูกที่นี่ อาการดีขึ้นชัดเจนตั้งแต่ครั้งแรก คุณหมอให้คำแนะนำดีมากครับ ตอนนี้ทำงานได้ไม่ต้องทรมานแล้ว',
        tags: ['ปวดเรื้อรัง', 'คลายกล้ามเนื้อ'],
        avatar_color: 'bg-blue-100 text-blue-600',
        doctorImage: doctorTeam1 // นพ. อเวจี (Chiropractic)
    },
    {
        id: 2,
        program: 'Sport Injury',
        reviewer: 'คุณภาคิน (นักวิ่งมาราธอน)',
        rating: 5,
        date: '5 ก.พ. 2024',
        comment: 'เจ็บเข่าจากการวิ่ง ลองพักแล้วไม่หาย มาปรึกษาหมอต่อ ตรวจละเอียดมาก เจอสาเหตุจริง ๆ รักษาตรงจุด กลับไปซ้อมวิ่งได้ไวขึ้น ประทับใจมากครับ',
        tags: ['บาดเจ็บจากการกีฬา', 'ฟื้นฟูไว'],
        avatar_color: 'bg-green-100 text-green-600',
        doctorImage: doctorStanding // นพ. สมชาย (Sports Medicine)
    },
    {
        id: 3,
        program: 'Scoliosis Care',
        reviewer: 'น้องมายด์ (นักเรียน)',
        rating: 5,
        date: '28 ธ.ค. 2023',
        comment: 'หนูมีปัญหากระดูกสันหลังคด บุคลิกภาพไม่ดี คุณแม่พามาจัดกระดูกที่นี่ ตอนนี้หลังตรงขึ้น มั่นใจขึ้นเยอะเลยค่ะ คุณหมอใจดี มือเบา ไม่เจ็บเลย',
        tags: ['กระดูกสันหลังคด', 'ปรับบุคลิกภาพ'],
        avatar_color: 'bg-pink-100 text-pink-600',
        doctorImage: doctorTeam2 // พญ. สุภาวดี (Pediatrics / Child)
    },
    {
        id: 4,
        program: 'Post Surgery Reigim',
        reviewer: 'คุณสมชาย (ข้าราชการเกษียณ)',
        rating: 5,
        date: '10 มี.ค. 2024',
        comment: 'ผ่าตัดหลังมาแล้วยังตึง ๆ เคลื่อนไหวลำบาก มาทำกายภาพฟื้นฟูที่นี่ นักกายภาพดูแลดี เครื่องมือทันสมัย ตอนนี้เดินคล่องขึ้นมาก ใช้ชีวิตมีความสุขครับ',
        tags: ['ฟื้นฟูหลังผ่าตัด', 'กายภาพบำบัด'],
        avatar_color: 'bg-orange-100 text-orange-600',
        doctorImage: doctorTeam3 // นักกายภาพ ประดิษฐ์ (Rehabilitation)
    },
    {
        id: 5,
        program: 'Migraine Relief',
        reviewer: 'คุณแอน (ดีไซเนอร์)',
        rating: 4,
        date: '15 ก.พ. 2024',
        comment: 'เป็นไมเกรนบ่อยมากจนกระทบงาน หมอบอกว่าเกิดจากคอบ่าเกร็งไปกดทับเส้นประสาท พอรักษาแล้วอาการปวดหัวลดลงแทบไม่ต้องกินยาเลยค่ะ',
        tags: ['ไมเกรน', 'นอนไม่หลับ'],
        avatar_color: 'bg-purple-100 text-purple-600',
        doctorImage: doctor // นพ. ต่อ (Chiropractic)
    },
    {
        id: 6,
        program: 'Geriatric Care',
        reviewer: 'คุณยายสมศรี',
        rating: 5,
        date: '2 ม.ค. 2024',
        comment: 'ปวดหลังตามประสาคนแก่ ลูกหลานพามาหาหมอ หมอน่ารัก พูดเพราะ รักษาแล้วเดินเหินสะดวกขึ้น ไม่ต้องให้ลูกหลานคอยพยุงตลอด ขอบคุณคุณหมอมากจ้ะ',
        tags: ['ผู้สูงอายุ', 'ข้อเสื่อม'],
        avatar_color: 'bg-teal-100 text-teal-600',
        doctorImage: doctorBooking // นพ. เก่งกาจ (Orthopedics)
    }
];

const Reviews = () => {
    const [activeReview, setActiveReview] = useState(reviewsData[0]);

    return (
        <section id="reviews" className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
            {/* Ambient Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 -left-20 w-[600px] h-[600px] bg-teal-100/30 rounded-full blur-3xl opacity-60"
                />
                <motion.div
                    animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl opacity-60"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-slate-800 mb-4">เสียงตอบรับจากผู้ใช้บริการ</h2>
                    <p className="text-slate-600">Real Reviews from Our Patients</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row h-full min-h-[auto] lg:min-h-[500px] gap-6 md:gap-8">
                    {/* Left Sidebar Menu (Horizontal Scroll on Mobile) */}
                    <div className="w-full lg:w-1/3 z-10 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-3 md:gap-3 snap-x no-scrollbar">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2 px-2 hidden lg:block">เลือกประเภทการรักษา</h3>
                        {reviewsData.map((review, i) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setActiveReview(review)}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group min-w-[260px] md:min-w-[300px] lg:min-w-0 snap-center
                                    ${activeReview.id === review.id
                                        ? 'bg-white border-teal-500 shadow-lg scale-100 lg:scale-105'
                                        : 'bg-white/40 border-transparent hover:bg-white/80 hover:border-teal-200'
                                    }`}
                            >
                                <div>
                                    <div className={`font-bold ${activeReview.id === review.id ? 'text-teal-700' : 'text-slate-700'}`}>
                                        {review.program}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">{review.reviewer}</div>
                                </div>
                                {activeReview.id === review.id && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-teal-500"
                                    >
                                        ➤
                                    </motion.span>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Content Area */}
                    <div className="w-full lg:w-2/3 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/80 backdrop-blur-xl rounded-3xl h-full p-6 md:p-12 shadow-2xl shadow-teal-100/20 border border-white/50 flex flex-col justify-center relative overflow-hidden"
                        >

                            {/* Review Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeReview.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative z-20"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${activeReview.avatar_color}`}>
                                            {activeReview.reviewer.charAt(1)}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800">{activeReview.reviewer}</h3>
                                            <div className="flex items-center text-yellow-400 gap-1 mt-1">
                                                {'★'.repeat(activeReview.rating)}
                                                <span className="text-slate-500 text-sm ml-2 font-normal">({activeReview.date})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="text-5xl text-teal-300 font-serif absolute -top-4 -left-2">"</div>
                                        <p className="text-slate-700 text-lg leading-relaxed relative z-10 pl-6 border-l-4 border-teal-400 italic">
                                            {activeReview.comment}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {activeReview.tags.map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <button className="text-teal-600 font-bold hover:underline flex items-center gap-2">
                                        อ่านรีวิวเพิ่มเติม <span className="text-sm">➜</span>
                                    </button>
                                </motion.div>
                            </AnimatePresence>

                            {/* Doctor Background Faded */}
                            {/* Doctor Background Faded */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeReview.doctorImage}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 0.2, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute right-[-20px] bottom-[-20px] md:right-[-50px] md:bottom-[-50px] w-48 md:w-96 pointer-events-none grayscale hover:grayscale-0 transition-all duration-700 opacity-20 md:opacity-100"
                                >
                                    <img
                                        src={activeReview.doctorImage}
                                        alt="Doctor"
                                        className="w-full object-contain"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Decoration Circle */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.3, 0.5]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                                className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"
                            ></motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
