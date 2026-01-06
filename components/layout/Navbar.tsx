'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { items, toggleCart } = useCartStore();

    const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Menu', href: '#menu' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-5'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[var(--color-saffron)] rounded-full flex items-center justify-center">
                            <span className="text-white text-xl font-bold font-[var(--font-heading)]">S</span>
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-[var(--color-dark)] font-[var(--font-heading)]">
                                Spice Haven
                            </h1>
                            <p className="text-xs text-[var(--color-gray)] font-[var(--font-accent)]">
                                Hotel & Restaurant
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className="text-[var(--color-dark)] hover:text-[var(--color-saffron)] transition-colors font-medium font-[var(--font-accent)]"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Cart & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        {/* Cart Button */}
                        <button
                            onClick={toggleCart}
                            className="relative p-2 hover:bg-[var(--color-light-gray)] rounded-full transition-colors"
                        >
                            <FiShoppingCart className="w-6 h-6 text-[var(--color-dark)]" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[var(--color-chili)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-[var(--color-light-gray)] rounded-full transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="w-6 h-6 text-[var(--color-dark)]" />
                            ) : (
                                <FiMenu className="w-6 h-6 text-[var(--color-dark)]" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col gap-4 pt-6 pb-4">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.name}
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-left text-[var(--color-dark)] hover:text-[var(--color-saffron)] transition-colors font-medium font-[var(--font-accent)] py-2"
                                    >
                                        {link.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
