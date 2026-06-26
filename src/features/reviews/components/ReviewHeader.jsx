'use strict';

export const ReviewHeader = ({ stats }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">

            <div>
                <h1 className="text-2xl md:text-3xl font-black italic text-gray-800 uppercase tracking-tight">
                    MIS <span className="text-[#e11d48]">RESEÑAS</span>
                </h1>
                <p className="text-gray-500 text-sm md:text-base font-medium italic mt-1">
                    Cuéntanos cómo te fue.
                </p>
            </div>

            <div className="flex gap-3 w-full sm:w-auto shrink-0">

                <div className="text-center bg-white p-3 md:p-4 rounded-3xl shadow-sm border border-orange-100 flex-1 sm:flex-initial sm:min-w-27.5">
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Mi promedio
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-gray-800">
                        {stats.average} <span className="text-[#facc15] text-xl">★</span>
                    </p>
                </div>

                <div className="text-center bg-white p-3 md:p-4 rounded-3xl shadow-sm border border-orange-100 flex-1 sm:flex-initial sm:min-w-27.5">
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Reseñas
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-gray-800">
                        {stats.total}
                    </p>
                </div>

                <div className="text-center bg-[#fff7ed] p-3 md:p-4 rounded-3xl shadow-sm border border-orange-100 flex-1 sm:flex-initial sm:min-w-27.5">
                    <p className="text-[9px] md:text-[10px] font-bold text-[#fb923c] uppercase tracking-widest mb-1">
                        Ordenes
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-[#e11d48]">
                        {stats.pending}
                    </p>
                </div>

            </div>

        </div>
    );
};
