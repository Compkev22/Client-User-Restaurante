'use strict';

import { useNavigate } from 'react-router-dom';

export const HomeCategoryChips = ({ categories }) => {
    const navigate = useNavigate();

    if (!categories.length) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 mt-10">
            <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => navigate(`/portal/menu?search=${encodeURIComponent(cat)}`)}
                        className="shrink-0 bg-white border border-gray-200 hover:border-[#e11d48] hover:text-[#e11d48] text-gray-600 text-xs font-black uppercase px-4 py-2 rounded-full transition-colors"
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};