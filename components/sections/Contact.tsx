'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        guests: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('Thank you! We will contact you soon to confirm your reservation.');
            setFormData({ name: '', email: '', phone: '', date: '', guests: '', message: '' });

            setTimeout(() => setSubmitMessage(''), 5000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: <FiMapPin className="w-6 h-6" />,
            title: 'Address',
            content: '123 Spice Street, Mumbai, Maharashtra 400001, India',
        },
        {
            icon: <FiPhone className="w-6 h-6" />,
            title: 'Phone',
            content: '+91 98765 43210',
        },
        {
            icon: <FiMail className="w-6 h-6" />,
            title: 'Email',
            content: 'info@spicehaven.com',
        },
        {
            icon: <FiClock className="w-6 h-6" />,
            title: 'Hours',
            content: 'Mon-Fri: 11AM-11PM | Sat-Sun: 10AM-12AM',
        },
    ];

    return (
        <section id="contact" className="section-padding bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-[var(--color-saffron)] font-semibold text-sm uppercase tracking-wider font-[var(--font-accent)]">
                        Contact Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-dark)] mt-3 mb-4 font-[var(--font-heading)]">
                        Book Your Table
                    </h2>
                    <p className="text-[var(--color-gray)] text-lg max-w-2xl mx-auto font-[var(--font-body)]">
                        Reserve your spot for an unforgettable dining experience
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[var(--color-cream)] p-6 rounded-lg"
                                >
                                    <div className="w-12 h-12 bg-[var(--color-saffron)] rounded-full flex items-center justify-center text-white mb-4">
                                        {info.icon}
                                    </div>
                                    <h3 className="font-semibold text-[var(--color-dark)] mb-2 font-[var(--font-heading)]">
                                        {info.title}
                                    </h3>
                                    <p className="text-sm text-[var(--color-gray)] font-[var(--font-body)]">
                                        {info.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Google Maps */}
                        <div className="rounded-lg overflow-hidden shadow-lg h-[300px]">
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
                    </motion.div>

                    {/* Reservation Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="bg-[var(--color-cream)] p-8 rounded-lg shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <Input
                                    label="Full Name"
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <Input
                                    label="Phone"
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Date & Time"
                                    type="datetime-local"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <Input
                                    label="Number of Guests"
                                    type="number"
                                    placeholder="2"
                                    min="1"
                                    max="20"
                                    value={formData.guests}
                                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-[var(--color-dark)] mb-1.5 font-[var(--font-accent)]">
                                    Special Requests
                                </label>
                                <textarea
                                    placeholder="Any dietary restrictions or special occasions?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)] focus:border-transparent placeholder:text-[var(--color-gray)] placeholder:text-sm resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                loading={isSubmitting}
                                className="w-full"
                            >
                                Reserve Table
                            </Button>

                            {submitMessage && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 text-center text-[var(--color-herb)] font-medium font-[var(--font-body)]"
                                >
                                    {submitMessage}
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
