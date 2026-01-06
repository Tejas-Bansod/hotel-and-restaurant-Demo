'use client';

import React from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCartStore, CartItem as CartItemType } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';

interface CartItemProps {
    item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateQuantity, removeItem } = useCartStore();

    return (
        <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
            {/* Image */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[var(--color-dark)] mb-1 truncate font-[var(--font-heading)]">
                    {item.name}
                </h4>
                <p className="text-[var(--color-saffron)] font-bold font-[var(--font-heading)]">
                    {formatCurrency(item.price)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                    <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-[var(--color-light-gray)] rounded-full hover:bg-[var(--color-saffron)] hover:text-white transition-colors"
                    >
                        <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="font-medium min-w-[20px] text-center font-[var(--font-body)]">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-[var(--color-light-gray)] rounded-full hover:bg-[var(--color-saffron)] hover:text-white transition-colors"
                    >
                        <FiPlus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={() => removeItem(item.productId)}
                className="text-[var(--color-gray)] hover:text-[var(--color-chili)] transition-colors"
            >
                <FiTrash2 className="w-5 h-5" />
            </button>
        </div>
    );
};

export default CartItem;
