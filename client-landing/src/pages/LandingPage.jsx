import React from 'react';
import Navbar from '../components/LandingPage/Navbar';
import Hero from '../components/LandingPage/Hero';
import Services from '../components/LandingPage/Services';
import Team from '../components/LandingPage/Team';
import Reviews from '../components/LandingPage/Reviews';
import Booking from '../components/LandingPage/Booking';
import Footer from '../components/LandingPage/Footer';
import FAB from '../components/LandingPage/FAB';
import SEO from '../components/SEO';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
            <SEO
                title="BetterBone Clinic - คลินิกจัดกระดูก"
                description="สัมผัสประสบการณ์การดูแลกระดูกและข้อระดับพรีเมียมที่ BetterBone Clinic โดยนพ.ต่อ ผู้เชี่ยวชาญด้านการจัดกระดูกด้วยประสบการณ์กว่า 16 ปี"
                keywords="จัดกระดูก, ปวดหลัง, ออฟฟิศซินโดรม, คลินิกจัดกระดูก, betterbone clinic, นพ.ต่อ"
            />
            <Navbar />
            <main>
                <Hero />
                <Services />
                <Team />
                <Booking />
                <Reviews />
            </main>
            <Footer />
            <FAB />
        </div>
    );
};

export default LandingPage;
