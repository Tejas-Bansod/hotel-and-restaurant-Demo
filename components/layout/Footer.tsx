'use client';

import React from 'react';
import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-dark)] text-white">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 py-12 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-[var(--color-saffron)] rounded-full flex items-center justify-center">
                                <span className="text-white text-xl font-bold font-[var(--font-heading)]">S</span>
                            </div>
                            <h3 className="text-xl font-bold font-[var(--font-heading)]">Spice Haven</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed font-[var(--font-body)]">
                            Experience authentic Indian cuisine and hospitality. From traditional recipes to modern comfort, we bring the flavors of India to your table.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-[var(--font-heading)]">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-gray-300 hover:text-[var(--color-saffron)] transition-colors text-sm font-[var(--font-body)]"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-[var(--font-heading)]">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm">
                                <FiMapPin className="w-5 h-5 text-[var(--color-saffron)] flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 font-[var(--font-body)]">
                                    123 Spice Street, Mumbai, Maharashtra 400001, India
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <FiPhone className="w-5 h-5 text-[var(--color-saffron)] flex-shrink-0" />
                                <span className="text-gray-300 font-[var(--font-body)]">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <FiMail className="w-5 h-5 text-[var(--color-saffron)] flex-shrink-0" />
                                <span className="text-gray-300 font-[var(--font-body)]">info@spicehaven.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours & Social */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-[var(--font-heading)]">Opening Hours</h4>
                        <div className="text-sm text-gray-300 mb-6 font-[var(--font-body)]">
                            <p className="mb-1">Monday - Friday: 11:00 AM - 11:00 PM</p>
                            <p className="mb-1">Saturday - Sunday: 10:00 AM - 12:00 AM</p>
                        </div>

                        <h4 className="text-lg font-semibold mb-4 font-[var(--font-heading)]">Follow Us</h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-[var(--color-saffron)] rounded-full flex items-center justify-center hover:bg-[var(--color-earth)] transition-colors"
                            >
                                <FiFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-[var(--color-saffron)] rounded-full flex items-center justify-center hover:bg-[var(--color-earth)] transition-colors"
                            >
                                <FiInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-[var(--color-saffron)] rounded-full flex items-center justify-center hover:bg-[var(--color-earth)] transition-colors"
                            >
                                <FiTwitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm font-[var(--font-body)]">
                        © {currentYear} Spice Haven Hotel & Restaurant. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
