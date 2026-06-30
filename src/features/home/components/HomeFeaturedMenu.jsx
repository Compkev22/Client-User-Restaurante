'use strict';

import { Spinner } from '../../../shared/ui/Spinner.jsx';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const FALLBACK_PRODUCT = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=200&auto=format&fit=crop';
const FALLBACK_COMBO   = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&auto=format&fit=crop';

export const HomeFeaturedMenu = ({ branchName, menuItems, loading, onAddToCart, onViewAll }) => (
    <div className="max-w-6xl mx-auto px-4 mt-8 mb-14">
        <div className="flex items-center justify-between mb-4">
            <div>
                <h2 className="text-xl font-black text-gray-800">Para disfrutar</h2>
                <p className="text-xs text-gray-400">{branchName}</p>
            </div>
            <button onClick={onViewAll} className="text-sm font-bold text-[#e11d48] hover:underline">
                Ver todo el menú →
            </button>
        </div>

        {loading ? (
            <div className="flex justify-center py-10">
                <Spinner size="md" color="text-[#e11d48]" />
            </div>
        ) : menuItems.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
                Esta sucursal todavía no tiene productos en su menú.
            </p>
        ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
                {menuItems.slice(0, 8).map((item) => {
                    const isCombo = item.type === 'Combo';
                    const imgSrc = item.type === 'Individual' && item.imagen_url && !item.imagen_url.includes('default-product')
                        ? item.imagen_url
                        : item.type === 'Combo' && item.image?.url
                            ? item.image.url
                            : (isCombo ? FALLBACK_COMBO : FALLBACK_PRODUCT);

                    return (
                        <div
                            key={item._id}
                            className="shrink-0 w-48 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden snap-start hover:shadow-lg transition-shadow"
                        >
                            <div className="w-full h-28 bg-[#fdfaf5] overflow-hidden">
                                <img
                                    src={imgSrc}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = isCombo ? FALLBACK_COMBO : FALLBACK_PRODUCT; }}
                                />
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-black text-gray-800 line-clamp-2 leading-tight mb-1 h-10">
                                    {item.name}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm font-black text-[#e11d48]">
                                        Q{item.price?.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => onAddToCart(item)}
                                        className="w-8 h-8 flex items-center justify-center bg-[#e11d48] hover:bg-red-700 text-white rounded-full transition-colors active:scale-90"
                                    >
                                        <ShoppingCartIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
    </div>
);