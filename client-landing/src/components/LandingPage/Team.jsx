import React from 'react';
import { motion } from 'framer-motion';
import doctorTeam1 from '../../assets/doctor-team-1.png'; // Male glasses
import doctorTeam2 from '../../assets/doctor-team-2.png'; // Female
import doctorTeam3 from '../../assets/doctor-team-3.png'; // Male arms crossed
import doctorStanding from '../../assets/doctor-standing.png';
import doctorBooking from '../../assets/doctor-booking.png';
import doctor from '../../assets/doctor.png';

const Team = () => {
    const team = [
        {
            name: "นพ. อเวจี สุดโคน",
            role: "ผู้เชี่ยวชาญด้านกระดูกสันหลัง",
            image: doctorTeam1,
            specialties: ["Chiropractic", "Orthopedics"]
        },
        {
            name: "พญ. สุภาวดี มีสุข",
            role: "กุมารแพทย์และพัฒนาการเด็ก",
            image: doctorTeam2,
            specialties: ["Pediatrics", "Child Development"]
        },
        {
            name: "นักกายภาพ ประดิษฐ์",
            role: "นักกายภาพบำบัดวิชาชีพ",
            image: doctorTeam3,
            specialties: ["Physical Therapy", "Rehabilitation"]
        },
        {
            name: "นพ. สมชาย ใจดี",
            role: "แพทย์เวชศาสตร์ฟื้นฟู",
            image: doctorStanding,
            specialties: ["Rehabilitation", "Sports Medicine"]
        },
        {
            name: "นพ. เก่งกาจ อาจหาญ",
            role: "ศัลยแพทย์กระดูกและข้อ",
            image: doctorBooking,
            specialties: ["Orthopedic Surgery", "Trauma"]
        },
        {
            name: "นพ. ต่อ",
            role: "ผู้เชี่ยวชาญด้านกระดูกสันหลัง",
            image: doctor,
            specialties: ["Chiropractic", "Orthopedics"]
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold text-teal-500 uppercase tracking-widest mb-2">Our Specialists</h2>
                    <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">ทีมแพทย์ผู้เชี่ยวชาญ</h3>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 justify-center">
                    {team.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.5 }}
                            className="group relative"
                        >
                            <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-teal-100/50 transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 hover:border-teal-200">
                                <div className="h-80 bg-gradient-to-b from-teal-50 to-white relative overflow-hidden flex items-end justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-full w-auto object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-4 md:p-6 text-center relative z-20 bg-white">
                                    <h4 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h4>
                                    <p className="text-teal-600 font-medium text-sm mb-4">{member.role}</p>
                                    <div className="flex justify-center flex-wrap gap-2 text-xs text-gray-400">
                                        {member.specialties.map((spec, i) => (
                                            <span key={i} className="px-2 py-1 bg-slate-50 rounded-md border border-slate-200">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
