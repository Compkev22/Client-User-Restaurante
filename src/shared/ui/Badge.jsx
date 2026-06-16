'use strict';

const VARIANTS = {
    success: 'bg-green-100 text-green-700 border border-green-200',
    danger:  'bg-red-100 text-red-700 border border-red-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    neutral: 'bg-gray-100 text-gray-600 border border-gray-200',
    primary: 'bg-red-50 text-[#e11d48] border border-red-100',
};

export const Badge = ({ children, variant = 'neutral', className = '' }) => (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${VARIANTS[variant]} ${className}`}>
        {children}
    </span>
);