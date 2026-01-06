'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiAward, FiHeart, FiUsers } from 'react-icons/fi';

const About: React.FC = () => {
    const features = [
        {
            icon: <FiAward className="w-8 h-8" />,
            title: 'Award Winning',
            description: 'Recognized for authentic Indian cuisine and exceptional service',
        },
        {
            icon: <FiHeart className="w-8 h-8" />,
            title: 'Made with Love',
            description: 'Traditional recipes passed down through generations',
        },
        {
            icon: <FiUsers className="w-8 h-8" />,
            title: 'Family Friendly',
            description: 'Warm hospitality and comfortable atmosphere for all',
        },
    ];

    return (
        <section id="about" className="section-padding bg-[var(--color-cream)] indian-pattern">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                            <Image
                                src="/images/restaurant/interior.png"
                                alt="Spice Haven Restaurant Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--color-saffron)] rounded-lg -z-10" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[var(--color-saffron)] font-semibold text-sm uppercase tracking-wider font-[var(--font-accent)]">
                            About Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-dark)] mt-3 mb-6 font-[var(--font-heading)]">
                            A Journey Through Indian Flavors
                        </h2>
                        <p className="text-[var(--color-gray)] text-lg mb-6 leading-relaxed font-[var(--font-body)]">
                            Since 2010, Spice Haven has been serving authentic Indian cuisine crafted with passion and tradition. Our chefs bring together the finest spices and ingredients to create dishes that celebrate India's rich culinary heritage.
                        </p>
                        <p className="text-[var(--color-gray)] text-lg mb-8 leading-relaxed font-[var(--font-body)]">
                            From the aromatic biryanis of Hyderabad to the rich curries of Punjab, every dish tells a story. We combine traditional cooking methods with modern presentation to deliver an unforgettable dining experience.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.6 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-[var(--color-saffron)] rounded-full flex items-center justify-center text-white mx-auto mb-3 shadow-lg">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-semibold text-[var(--color-dark)] mb-2 font-[var(--font-heading)]">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-[var(--color-gray)] font-[var(--font-body)]">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
