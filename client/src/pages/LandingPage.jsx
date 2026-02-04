import React from 'react';
import Navbar from '../components/LandingPage/Navbar';
import Hero from '../components/LandingPage/Hero';
import Services from '../components/LandingPage/Services';
import Booking from '../components/LandingPage/Booking';
import Reviews from '../components/LandingPage/Reviews';
import Footer from '../components/LandingPage/Footer';

const LandingPage = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />
            <Hero />
            <Services />
            <Booking />
            <Reviews />
            <Footer />
        </div>
    );
};

export default LandingPage;
