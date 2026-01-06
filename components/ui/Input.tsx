import React, { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
    helperText?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    helperText,
    className,
    id,
    ...props
}) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-[var(--color-dark)] mb-1.5 font-[var(--font-accent)]"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gray)]">
                        {icon}
                    </div>
                )}

                <input
                    id={inputId}
                    className={cn(
                        'w-full px-4 py-2.5 border rounded-md transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)] focus:border-transparent',
                        'placeholder:text-[var(--color-gray)] placeholder:text-sm',
                        error ? 'border-[var(--color-chili)]' : 'border-gray-300',
                        icon && 'pl-10',
                        className
                    )}
                    {...props}
                />
            </div>

            {error && (
                <p className="mt-1.5 text-sm text-[var(--color-chili)] font-[var(--font-body)]">
                    {error}
                </p>
            )}

            {helperText && !error && (
                <p className="mt-1.5 text-sm text-[var(--color-gray)] font-[var(--font-body)]">
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default Input;
