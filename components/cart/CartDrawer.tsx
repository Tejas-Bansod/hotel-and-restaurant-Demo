'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import CartItem from './CartItem';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import CheckoutForm from './CheckoutForm';

const CartDrawer: React.FC = () => {
    const { items, isCartOpen, toggleCart, getTotalPrice } = useCartStore();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const totalPrice = getTotalPrice();

    const handleCheckout = () => {
        setIsCheckoutOpen(true);
    };

    return (
        <>
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleCart}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <FiShoppingBag className="w-6 h-6 text-[var(--color-saffron)]" />
                                    <h2 className="text-2xl font-bold text-[var(--color-dark)] font-[var(--font-heading)]">
                                        Your Cart
                                    </h2>
                                </div>
                                <button
                                    onClick={toggleCart}
                                    className="p-2 hover:bg-[var(--color-light-gray)] rounded-full transition-colors"
                                >
                                    <FiX className="w-6 h-6 text-[var(--color-dark)]" />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <FiShoppingBag className="w-16 h-16 text-[var(--color-gray)] mb-4" />
                                        <p className="text-[var(--color-gray)] font-[var(--font-body)]">
                                            Your cart is empty
                                        </p>
                                        <p className="text-sm text-[var(--color-gray)] mt-2 font-[var(--font-body)]">
                                            Add some delicious items to get started!
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-0">
                                        {items.map((item) => (
                                            <CartItem key={item.productId} item={item} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="border-t border-gray-200 p-6 bg-[var(--color-cream)]">
                                    {/* Total */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-lg font-semibold text-[var(--color-dark)] font-[var(--font-heading)]">
                                            Total
                                        </span>
                                        <span className="text-2xl font-bold text-[var(--color-saffron)] font-[var(--font-heading)]">
                                            {formatCurrency(totalPrice)}
                                        </span>
                                    </div>

                                    {/* Checkout Button */}
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={handleCheckout}
                                        className="w-full"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Checkout Modal */}
            <Modal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                title="Complete Your Order"
                size="lg"
            >
                <CheckoutForm onSuccess={() => {
                    setIsCheckoutOpen(false);
                    toggleCart();
                }} />
            </Modal>
        </>
    );
};

export default CartDrawer;
