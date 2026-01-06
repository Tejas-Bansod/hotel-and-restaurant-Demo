'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import Button from '../ui/Button';

const Hero: React.FC = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/restaurant/interior.png"
                    alt="Spice Haven Restaurant"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block mb-6"
                        >
                            <span className="px-6 py-2 bg-[var(--color-saffron)] text-white rounded-full text-sm font-semibold font-[var(--font-accent)] shadow-lg">
                                ✨ Authentic Indian Cuisine Since 2010
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-[var(--font-heading)] leading-tight"
                        >
                            Spice Haven
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[var(--color-turmeric)] font-[var(--font-heading)]">
                                Hotel & Restaurant
                            </h2>
                            <p className="text-lg md:text-xl text-gray-200 max-w-xl font-[var(--font-body)] leading-relaxed">
                                Experience the rich flavors of India with our authentic recipes, warm hospitality, and comfortable accommodations
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 mb-8"
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => scrollToSection('menu')}
                                className="min-w-[200px]"
                            >
                                View Our Menu
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => scrollToSection('contact')}
                                className="min-w-[200px] border-white text-white hover:bg-white hover:text-[var(--color-dark)]"
                            >
                                Book a Table
                            </Button>
                        </motion.div>

                        {/* Quick Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-6 text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <FiMapPin className="w-5 h-5 text-[var(--color-saffron)]" />
                                <span className="font-[var(--font-body)]">Mumbai, Maharashtra</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiPhone className="w-5 h-5 text-[var(--color-saffron)]" />
                                <span className="font-[var(--font-body)]">+91 98765 43210</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Google Maps */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="hidden lg:block"
                    >
                        <div className="bg-white p-4 rounded-lg shadow-2xl">
                            <h3 className="text-xl font-bold text-[var(--color-dark)] mb-3 font-[var(--font-heading)]">
                                Find Us Here
                            </h3>
                            <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.082177513217966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1704463200000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <div className="mt-3 text-sm text-[var(--color-gray)] font-[var(--font-body)]">
                                <p className="font-semibold text-[var(--color-dark)]">123 Spice Street</p>
                                <p>Mumbai, Maharashtra 400001, India</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
