'use strict';

export const Spinner = ({ size = 'md', color = 'text-[#e11d48]' }) => {
    const sizes = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={`${sizes[size]} ${color} animate-spin`}>
            <svg viewBox="0 0 24 24" fill="none">
                <circle
                    cx="12" cy="12" r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="15 85"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};

export const FullPageSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf5]">
        <div className="text-center space-y-4">
            <Spinner size="lg" />
            <p className="text-gray-500 font-medium">Cargando...</p>
        </div>
    </div>
);