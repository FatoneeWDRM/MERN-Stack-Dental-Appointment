import React from 'react';
import Navbar from '../components/LandingPage/Navbar';
import Hero from '../components/LandingPage/Hero';
import Services from '../components/LandingPage/Services';
import Team from '../components/LandingPage/Team';
import Reviews from '../components/LandingPage/Reviews';
import Booking from '../components/LandingPage/Booking';
import Footer from '../components/LandingPage/Footer';
import FAB from '../components/LandingPage/FAB';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
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
