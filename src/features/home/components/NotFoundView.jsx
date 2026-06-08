'use strict';

import { useNavigate } from 'react-router-dom';

export const NotFoundView = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfaf5] text-center p-8">
            <div className="text-8xl mb-6">🍗</div>
            <h1 className="text-4xl font-black text-[#7f1d1d] mb-2">404</h1>
            <p className="text-gray-500 mb-8 text-lg">Esta página voló al freidor y no volvió.</p>
            <button
                onClick={() => navigate('/portal')}
                className="bg-[#e11d48] hover:bg-[#be123c] text-white font-black py-3 px-8 rounded-xl transition-all"
            >
                Volver al inicio
            </button>
        </div>
    );
};