'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const AdminLoginPage: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                router.push('/admin/dashboard');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--color-saffron)] to-[var(--color-earth)] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[var(--color-saffron)] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🍛</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--color-dark)] font-[var(--font-heading)]">
                        Spice Haven
                    </h1>
                    <p className="text-[var(--color-gray)] mt-2 font-[var(--font-body)]">
                        Admin Portal
                    </p>
                </div>

                {/* Demo Credentials Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800 font-semibold mb-2">Demo Credentials:</p>
                    <p className="text-sm text-blue-700">Email: admin@spicehaven.com</p>
                    <p className="text-sm text-blue-700">Password: admin123</p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3"
                    >
                        <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800 font-[var(--font-body)]">{error}</p>
                    </motion.div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="admin@spicehaven.com"
                        icon={<FiMail />}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        icon={<FiLock />}
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        loading={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-[var(--color-gray)] font-[var(--font-body)]">
                        Protected by NextAuth.js
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLoginPage;
