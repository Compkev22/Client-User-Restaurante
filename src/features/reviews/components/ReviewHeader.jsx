'use strict';

import ReviewsIcon from '../../../assets/icons/Reviews.svg';

export const ReviewHeader = ({ stats }) => {
    return (
        <div className="space-y-4">

            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <img
                        src={ReviewsIcon}
                        alt="Reseñas"
                        className="w-8 h-8"
                        style={{ filter: 'brightness(0) invert(1)' }}
                    />
                </div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">
                    Mis <span className="text-[#e11d48]">Reseñas</span>
                </h1>
                <p className="text-gray-500 text-sm">Cuéntanos cómo te fue.</p>
            </div>

            {/* Stats — se mantienen igual */}
            <div className="flex gap-3 justify-center">
                <div className="text-center bg-white p-3 md:p-4 rounded-3xl shadow-sm border border-orange-100 min-w-24">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Mi promedio
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-gray-800">
                        {stats.average} <span className="text-[#facc15] text-xl">★</span>
                    </p>
                </div>
                <div className="text-center bg-white p-3 md:p-4 rounded-3xl shadow-sm border border-orange-100 min-w-24">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Reseñas
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-gray-800">
                        {stats.total}
                    </p>
                </div>
                <div className="text-center bg-[#fff7ed] p-3 md:p-4 rounded-3xl shadow-sm border border-orange-100 min-w-24">
                    <p className="text-[10px] font-bold text-[#fb923c] uppercase tracking-widest mb-1">
                        Órdenes
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-[#e11d48]">
                        {stats.pending}
                    </p>
                </div>
            </div>

        </div>
    );
};