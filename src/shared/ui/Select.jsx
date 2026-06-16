'use strict';

import { forwardRef } from 'react';

export const Select = forwardRef(({ label, error, options = [], className = '', ...rest }, ref) => {
    const baseClass =
        `w-full px-4 py-2.5 bg-white border rounded-lg text-sm outline-none transition-all ${
            error
                ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-red-100'
        } ${className}`;

    return (
        <div>
            {label && (
                <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">
                    {label}
                </label>
            )}
            <select ref={ref} className={baseClass} {...rest}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
});

Select.displayName = 'Select';