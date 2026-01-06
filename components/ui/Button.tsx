import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: ReactNode;
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    children,
    className,
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[var(--color-saffron)] text-white hover:bg-[var(--color-earth)] focus:ring-[var(--color-saffron)] shadow-md hover:shadow-lg',
        secondary: 'bg-[var(--color-earth)] text-white hover:bg-[var(--color-dark)] focus:ring-[var(--color-earth)] shadow-md hover:shadow-lg',
        outline: 'border-2 border-[var(--color-saffron)] text-[var(--color-saffron)] hover:bg-[var(--color-saffron)] hover:text-white focus:ring-[var(--color-saffron)]',
        ghost: 'text-[var(--color-dark)] hover:bg-[var(--color-light-gray)] focus:ring-[var(--color-gray)]',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-7 py-3.5 text-lg',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </>
            ) : (
                <>
                    {icon && <span>{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;
