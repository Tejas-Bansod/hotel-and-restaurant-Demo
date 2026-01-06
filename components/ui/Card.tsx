import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CardProps {
    image?: string;
    title: string;
    description?: string;
    footer?: ReactNode;
    className?: string;
    imageClassName?: string;
    hoverEffect?: boolean;
    onClick?: () => void;
    children?: ReactNode;
}

const Card: React.FC<CardProps> = ({
    image,
    title,
    description,
    footer,
    className,
    imageClassName,
    hoverEffect = true,
    onClick,
    children,
}) => {
    return (
        <div
            className={cn(
                'bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300',
                hoverEffect && 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {image && (
                <div className="relative w-full h-48 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={cn('object-cover transition-transform duration-300', hoverEffect && 'hover:scale-110', imageClassName)}
                    />
                </div>
            )}

            <div className="p-5">
                <h3 className="text-xl font-semibold text-[var(--color-dark)] mb-2 font-[var(--font-heading)]">
                    {title}
                </h3>

                {description && (
                    <p className="text-[var(--color-gray)] text-sm mb-4 line-clamp-3">
                        {description}
                    </p>
                )}

                {children}
            </div>

            {footer && (
                <div className="px-5 pb-5 pt-0">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
