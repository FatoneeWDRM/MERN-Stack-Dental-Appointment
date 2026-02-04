import React, { useState } from 'react';
import { motion } from 'framer-motion';
import doctorImage from '../../assets/doctor.png';
import clinicBg from '../../assets/clinic-bg.png';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        symptom: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
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

        // Mock API Call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setStatus('success');
            // Reset form after seeing success message
            setTimeout(() => {
                setStatus('idle');
                setFormData({ name: '', age: '', phone: '', symptom: '' });
            }, 3000);
        }, 1500);
    };

    return (
        <section id="booking" className="relative py-24 bg-slate-700 overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 opacity-20">
                <img src={clinicBg} alt="" className="w-full h-full object-cover" />
            </div>

            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-white text-center mb-16 relative z-10 drop-shadow-md"
            >
                จองคิวออนไลน์
            </motion.h2>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-end justify-center gap-0 lg:gap-8 h-full">
                    {/* Doctor Image (Left) */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-5/12 flex justify-center lg:justify-start relative h-full pl-10"
                    >
                        <img
                            src={doctorImage}
                            alt="Doctor"
                            className="h-[600px] object-cover object-top drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Booking Clipboard (Right) */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-5/12 pb-20 pr-10"
                    >
                        <div className="bg-[#654321] p-6 rounded-3xl shadow-2xl relative max-w-[480px] mx-auto border-t-8 border-l-8 border-[#543516] transition-transform hover:scale-[1.01] duration-300">
                            {/* White Paper */}
                            <div className="bg-white rounded-xl p-8 min-h-[550px] flex flex-col relative text-center shadow-inner overflow-hidden">

                                {status === 'success' ? (
                                    <div className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center animate-fadeIn">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">จองคิวสำเร็จ!</h3>
                                        <p className="text-gray-500">เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุดครับ</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Top Line Graphic */}
                                        <div className="w-24 h-1.5 bg-gray-300 mx-auto rounded-full mb-8"></div>

                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-black uppercase tracking-wider">แบบฟอร์มลงทะเบียน</h3>
                                            <p className="text-xs text-gray-400 mt-1">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="flex-1 text-left space-y-4">
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 mb-1 block ml-1 font-medium">ชื่อ - นามสกุล</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        disabled={status === 'loading'}
                                                        className={`w-full bg-gray-50 border ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-colors`}
                                                        placeholder="ระบุชื่อจริง"
                                                    />
                                                    {errors.name && <span className="text-xs text-red-500 ml-1">{errors.name}</span>}
                                                </div>
                                                <div className="w-24">
                                                    <label className="text-xs text-gray-500 mb-1 block ml-1 font-medium">อายุ</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="age"
                                                            value={formData.age}
                                                            onChange={handleInputChange}
                                                            disabled={status === 'loading'}
                                                            className={`w-full bg-gray-50 border ${errors.age ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-lg px-3 py-2.5 text-sm text-center focus:outline-none focus:border-teal-500 shadow-sm pr-6 transition-colors`}
                                                            placeholder="--"
                                                        />
                                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">ปี</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block ml-1 font-medium">เบอร์โทรศัพท์</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    disabled={status === 'loading'}
                                                    className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 shadow-sm transition-colors`}
                                                    placeholder="0xx-xxx-xxxx"
                                                />
                                                {errors.phone && <span className="text-xs text-red-500 ml-1">{errors.phone}</span>}
                                            </div>

                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block ml-1 font-medium">อาการเบื้องต้น (ถ้ามี)</label>
                                                <select
                                                    name="symptom"
                                                    value={formData.symptom}
                                                    onChange={handleInputChange}
                                                    disabled={status === 'loading'}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:bg-white text-gray-600 transition-colors appearance-none cursor-pointer"
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

                                            {/* "Chart Mor" Text */}
                                            <div className="flex-1 flex items-center justify-center py-8 opacity-90">
                                                <h2 className="text-5xl font-extrabold text-[#543516]/20 tracking-wide select-none rotate-[-5deg]"></h2>
                                            </div>

                                            <div className="flex justify-center pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={status === 'loading'}
                                                    className={`w-full px-6 py-3 rounded-xl text-sm font-bold shadow-md transform transition-all flex items-center justify-center gap-2
                                                        ${status === 'loading'
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : 'bg-teal-600 text-white hover:bg-teal-700 hover:-translate-y-1 hover:shadow-lg'
                                                        }`}
                                                >
                                                    {status === 'loading' ? (
                                                        <>
                                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            กำลังส่งข้อมูล...
                                                        </>
                                                    ) : (
                                                        'ยืนยันการจองคิว'
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Booking;
