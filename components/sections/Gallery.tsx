'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Gallery: React.FC = () => {
    const galleryImages = [
        { src: '/images/food/biryani.png', alt: 'Chicken Biryani', span: 'col-span-2 row-span-2' },
        { src: '/images/food/butter-chicken.png', alt: 'Butter Chicken' },
        { src: '/images/food/samosa.png', alt: 'Samosa Platter' },
        { src: '/images/food/tandoori.png', alt: 'Tandoori Platter', span: 'col-span-2' },
        { src: '/images/gallery/spices.png', alt: 'Indian Spices' },
        { src: '/images/food/gulab-jamun.png', alt: 'Gulab Jamun' },
        { src: '/images/restaurant/interior.png', alt: 'Restaurant Interior', span: 'col-span-2' },
        { src: '/images/food/thali.png', alt: 'Traditional Thali' },
        { src: '/images/food/masala-chai.png', alt: 'Masala Chai' },
    ];

    return (
        <section id="gallery" className="section-padding bg-[var(--color-light-gray)]">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-[var(--color-saffron)] font-semibold text-sm uppercase tracking-wider font-[var(--font-accent)]">
                        Gallery
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-dark)] mt-3 mb-4 font-[var(--font-heading)]">
                        A Visual Feast
                    </h2>
                    <p className="text-[var(--color-gray)] text-lg max-w-2xl mx-auto font-[var(--font-body)]">
                        Explore the vibrant colors and rich textures of our culinary creations
                    </p>
                </motion.div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`relative group overflow-hidden rounded-lg shadow-lg ${image.span || ''}`}
                            style={{ minHeight: '200px' }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                <p className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-[var(--font-heading)]">
                                    {image.alt}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
