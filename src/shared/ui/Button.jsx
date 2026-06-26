'use strict';


import { Spinner } from './Spinner.jsx';
import { Spinner } from '../ui/Spinner.jsx';

const VARIANTS = {
    primary:   'bg-[#e11d48] hover:bg-red-700 text-white shadow-lg',
    secondary: 'bg-[#fb923c] hover:bg-orange-500 text-white shadow-lg',
    outline:   'bg-transparent border-2 border-[#e11d48] text-[#e11d48] hover:bg-red-50',
    ghost:     'bg-transparent text-gray-600 hover:bg-gray-100',
    danger:    'bg-red-600 hover:bg-red-700 text-white shadow-lg',
};

const SIZES = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
};

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    type = 'button',
    className = '',
    onClick,
    ...rest
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center gap-2 font-black rounded-xl
                transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
                ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
            {...rest}
        >
            {loading && <Spinner size="sm" color={variant === 'outline' || variant === 'ghost' ? 'text-[#e11d48]' : 'text-white'} />}
            {children}
        </button>
    );
};