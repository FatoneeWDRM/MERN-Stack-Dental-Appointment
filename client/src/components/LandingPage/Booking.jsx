import React, { useState } from 'react';
import { motion } from 'framer-motion';
import doctorBooking from '../../assets/doctor-booking.png';
import { FaUser, FaPhone, FaNotesMedical, FaCalendarCheck, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        symptom: ''
    });

    const [status, setStatus] = useState('idle');
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'กรุณากรอกชื่อ-นามสกุล';
        if (!formData.age.trim()) newErrors.age = 'กรุณาระบุอายุ';
        if (!formData.phone.trim()) newErrors.phone = 'กรุณากรอกเบอร์โทร';
        else if (formData.phone.length < 9) newErrors.phone = 'เบอร์โทรไม่ถูกต้อง';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setStatus('loading');
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setFormData({ name: '', age: '', phone: '', symptom: '' });
            }, 3000);
        }, 1500);
    };

    return (
        <section id="booking" className="relative py-24 overflow-hidden bg-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px]" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-teal-200">
                        <FaCalendarCheck className="text-xs" />
                        นัดหมายออนไลน์
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
                        จองคิว<span className="text-teal-600">ล่วงหน้า</span>
                    </h2>
                    <p className="text-slate-500 max-w-lg mx-auto">
                        กรอกข้อมูลเพื่อนัดหมาย เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมง
                    </p>
                </motion.div>

                {/* Main Content - Two Column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left - Doctor Image & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Doctor Card */}
                        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-8 relative overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                                {/* Doctor Image */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={doctorBooking}
                                        alt="Doctor"
                                        className="w-48 h-48 object-cover object-top rounded-2xl shadow-2xl"
                                    />
                                </div>

                                {/* Info */}
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-white mb-2">JKD CLINIC</h3>
                                    <p className="text-teal-100 text-sm mb-4">คลินิกจัดกระดูกและกายภาพบำบัด</p>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-white/90">
                                            <FaClock className="text-teal-200" />
                                            <span className="text-sm">จันทร์ - เสาร์: 09:00 - 18:00</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/90">
                                            <FaPhone className="text-teal-200" />
                                            <span className="text-sm">02-xxx-xxxx</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/90">
                                            <FaMapMarkerAlt className="text-teal-200" />
                                            <span className="text-sm">กรุงเทพมหานคร</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            {[
                                { value: '16+', label: 'ปีประสบการณ์' },
                                { value: '1,500+', label: 'เคส' },
                                { value: '5.0', label: 'คะแนน' },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                                    <div className="text-2xl font-bold text-teal-600">{stat.value}</div>
                                    <div className="text-xs text-slate-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-12"
                                >
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">จองคิวสำเร็จ!</h3>
                                    <p className="text-slate-500 text-center">เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-slate-800 mb-1">กรอกข้อมูลนัดหมาย</h3>
                                        <p className="text-slate-500 text-sm">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Name & Age */}
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="col-span-3">
                                                <label className="flex items-center gap-2 text-sm text-slate-600 mb-2 font-medium">
                                                    <FaUser className="text-teal-500 text-xs" />
                                                    ชื่อ - นามสกุล
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    disabled={status === 'loading'}
                                                    className={`w-full bg-slate-50 border-2 ${errors.name ? 'border-red-300' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors`}
                                                    placeholder="ระบุชื่อจริง"
                                                />
                                                {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                                            </div>
                                            <div className="col-span-1">
                                                <label className="text-sm text-slate-600 mb-2 block font-medium">อายุ</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="age"
                                                        value={formData.age}
                                                        onChange={handleInputChange}
                                                        disabled={status === 'loading'}
                                                        className={`w-full bg-slate-50 border-2 ${errors.age ? 'border-red-300' : 'border-slate-200'} rounded-xl px-3 py-3 text-sm text-center focus:outline-none focus:border-teal-500 transition-colors`}
                                                        placeholder="--"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="flex items-center gap-2 text-sm text-slate-600 mb-2 font-medium">
                                                <FaPhone className="text-teal-500 text-xs" />
                                                เบอร์โทรศัพท์
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                disabled={status === 'loading'}
                                                className={`w-full bg-slate-50 border-2 ${errors.phone ? 'border-red-300' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors`}
                                                placeholder="0xx-xxx-xxxx"
                                            />
                                            {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone}</span>}
                                        </div>

                                        {/* Symptom */}
                                        <div>
                                            <label className="flex items-center gap-2 text-sm text-slate-600 mb-2 font-medium">
                                                <FaNotesMedical className="text-teal-500 text-xs" />
                                                อาการเบื้องต้น
                                            </label>
                                            <select
                                                name="symptom"
                                                value={formData.symptom}
                                                onChange={handleInputChange}
                                                disabled={status === 'loading'}
                                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 text-slate-600 appearance-none cursor-pointer"
                                            >
                                                <option value="">-- เลือกอาการ --</option>
                                                <option value="back_pain">ปวดหลัง / เอว</option>
                                                <option value="neck_pain">ปวดคอ บ่า ไหล่</option>
                                                <option value="office_syndrome">ออฟฟิศซินโดรม</option>
                                                <option value="sport_injury">บาดเจ็บจากการเล่นกีฬา</option>
                                                <option value="check_up">ตรวจเช็คโครงสร้างกระดูก</option>
                                                <option value="other">อื่น ๆ</option>
                                            </select>
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className={`w-full py-4 rounded-xl text-base font-bold shadow-lg transition-all flex items-center justify-center gap-2 mt-4
                                                ${status === 'loading'
                                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                    : 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-xl'
                                                }`}
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    กำลังส่ง...
                                                </>
                                            ) : (
                                                <>
                                                    <FaCalendarCheck />
                                                    ยืนยันการจองคิว
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Booking;
