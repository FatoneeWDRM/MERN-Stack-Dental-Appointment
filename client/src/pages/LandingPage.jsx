import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Navbar */}
            <nav className="bg-white shadow-sm fixed w-full z-10 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-blue-600 tracking-tight">Smart Smile Dental</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">Login</Link>
                            <Link
                                to="/register"
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition shadow-md hover:shadow-lg"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center">
                    <div className="w-full lg:w-1/2 text-center lg:text-left md:pr-12">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Your Perfect <span className="text-blue-600">Smile</span> Starts Here
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Experience gentle, advanced dental care. From routine checkups to cosmetic makeovers, we make every visit something to smile about.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                            <Link
                                to="/register"
                                className="px-8 py-3.5 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
                            >
                                Book Checkup
                            </Link>
                            <Link
                                to="/login"
                                className="px-8 py-3.5 bg-white text-blue-600 border-2 border-blue-600 text-lg font-bold rounded-lg hover:bg-blue-50 transition"
                            >
                                Patient Return
                            </Link>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
                        {/* Placeholder for illustration */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-blue-100 aspect-video flex items-center justify-center">
                            <span className="text-6xl">🦷 ✨</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Smart Smile?</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">We prioritize your oral health with technology that makes life easier.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: 'Easy Booking', desc: 'Schedule appointments in seconds. No more waiting on hold.', icon: '📅' },
                            { title: 'Expert Dentists', desc: 'Access top-rated specialists in Orthodontics and Surgery.', icon: '👨‍⚕️' },
                            { title: 'Digital Records', desc: 'Access your dental X-rays and history anytime, securely.', icon: '🦷' },
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 bg-slate-50 rounded-xl hover:shadow-xl transition duration-300 border border-slate-100">
                                <div className="text-4xl mb-6">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4">Smart Smile Dental</h2>
                        <p className="text-gray-400 max-w-sm">Providing quality dental care with a modern touch. Your perfect smile is our mission.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                            <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>123 Smile Street</li>
                            <li>Bangkok, Thailand</li>
                            <li>contact@smartsmile.com</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    © 2026 Smart Smile Dental. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
