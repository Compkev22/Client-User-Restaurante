'use strict';

export const Card = ({ children, className = '', ...rest }) => (
    <div
        className={`bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow p-5 ${className}`}
        {...rest}
    >
        {children}
    </div>
);