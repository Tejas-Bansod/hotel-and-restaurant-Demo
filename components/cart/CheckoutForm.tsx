'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface CheckoutFormProps {
    onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess }) => {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        orderType: 'delivery',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderData = {
            items: items.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
            })),
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            customerAddress: formData.address,
            totalAmount: getTotalPrice(),
            orderType: formData.orderType,
            notes: formData.notes,
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (result.success) {
                clearCart();
                alert('Order placed successfully! Order ID: #' + result.data._id.slice(-6) + '\nWe will contact you shortly.');
                onSuccess();
            } else {
                alert('Failed to place order: ' + result.error);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Summary */}
            <div className="bg-[var(--color-cream)] p-4 rounded-lg">
                <h3 className="font-semibold text-[var(--color-dark)] mb-3 font-[var(--font-heading)]">
                    Order Summary
                </h3>
                <div className="space-y-2 mb-3">
                    {items.map((item) => (
                        <div key={item.productId} className="flex justify-between text-sm">
                            <span className="text-[var(--color-gray)] font-[var(--font-body)]">
                                {item.name} x {item.quantity}
                            </span>
                            <span className="font-medium text-[var(--color-dark)] font-[var(--font-body)]">
                                {formatCurrency(item.price * item.quantity)}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between">
                    <span className="font-semibold text-[var(--color-dark)] font-[var(--font-heading)]">
                        Total
                    </span>
                    <span className="text-xl font-bold text-[var(--color-saffron)] font-[var(--font-heading)]">
                        {formatCurrency(getTotalPrice())}
                    </span>
                </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                />
                <div>
                    <label className="block text-sm font-medium text-[var(--color-dark)] mb-1.5 font-[var(--font-accent)]">
                        Order Type
                    </label>
                    <select
                        value={formData.orderType}
                        onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)] focus:border-transparent"
                        required
                    >
                        <option value="delivery">Delivery</option>
                        <option value="takeaway">Takeaway</option>
                        <option value="dine-in">Dine-in</option>
                    </select>
                </div>
            </div>

            {formData.orderType === 'delivery' && (
                <Input
                    label="Delivery Address"
                    type="text"
                    placeholder="Your full address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                />
            )}

            <div>
                <label className="block text-sm font-medium text-[var(--color-dark)] mb-1.5 font-[var(--font-accent)]">
                    Special Instructions
                </label>
                <textarea
                    placeholder="Any special requests?"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
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
                Place Order
            </Button>
        </form>
    );
};

export default CheckoutForm;
