'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'main-course', name: 'Main Course' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
];

const Menu: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
    const { addItem } = useCartStore();

    // Fetch products from API
    const { data, error, isLoading } = useSWR(
        `/api/products${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`,
        fetcher
    );

    const menuItems = data?.data || [];

    const handleAddToCart = (item: any) => {
        addItem({
            productId: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
        });

        setAddedItems(prev => new Set(prev).add(item._id));
        setTimeout(() => {
            setAddedItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(item._id);
                return newSet;
            });
        }, 2000);
    };

    return (
        <section id="menu" className="section-padding bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-[var(--color-saffron)] font-semibold text-sm uppercase tracking-wider font-[var(--font-accent)]">
                        Our Menu
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-dark)] mt-3 mb-4 font-[var(--font-heading)]">
                        Discover Our Delicious Dishes
                    </h2>
                    <p className="text-[var(--color-gray)] text-lg max-w-2xl mx-auto font-[var(--font-body)]">
                        Explore our carefully curated menu featuring authentic Indian flavors
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 font-[var(--font-accent)] ${activeCategory === category.id
                                    ? 'bg-[var(--color-saffron)] text-white shadow-lg'
                                    : 'bg-[var(--color-light-gray)] text-[var(--color-dark)] hover:bg-[var(--color-saffron)] hover:text-white'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-[var(--color-saffron)] border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-[var(--color-gray)] font-[var(--font-body)]">Loading menu...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-[var(--color-chili)] font-[var(--font-body)]">
                            Failed to load menu items. Please try again later.
                        </p>
                    </div>
                )}

                {/* Menu Grid */}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menuItems.map((item: any, index: number) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <Card
                                    image={item.image}
                                    title={item.name}
                                    description={item.description}
                                    footer={
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-[var(--color-saffron)] font-[var(--font-heading)]">
                                                    {formatCurrency(item.price)}
                                                </p>
                                                <div className="flex gap-2 mt-1">
                                                    {item.vegetarian && (
                                                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-[var(--font-body)]">
                                                            Veg
                                                        </span>
                                                    )}
                                                    {item.spiceLevel && (
                                                        <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-[var(--font-body)]">
                                                            🌶️ {item.spiceLevel}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                variant={addedItems.has(item._id) ? 'secondary' : 'primary'}
                                                size="sm"
                                                onClick={() => handleAddToCart(item)}
                                                icon={addedItems.has(item._id) ? <FiCheck /> : <FiShoppingCart />}
                                                disabled={!item.availability}
                                            >
                                                {addedItems.has(item._id) ? 'Added' : 'Add'}
                                            </Button>
                                        </div>
                                    }
                                />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && menuItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-[var(--color-gray)] font-[var(--font-body)]">
                            No items found in this category.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Menu;
