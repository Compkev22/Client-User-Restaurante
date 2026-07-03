'use strict';

import { formatCurrency } from '../../../shared/utils/formatters.js';

const FALLBACK_PRODUCT = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=200&auto=format&fit=crop';
const FALLBACK_COMBO = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&auto=format&fit=crop';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    const isCombo = item.tipo === 'Combo';
    const imgSrc = item.imagen || (isCombo ? FALLBACK_COMBO : FALLBACK_PRODUCT);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex items-center gap-4 p-4 animate-fadeIn">
            {/* Imagen */}
            <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                <img
                    src={imgSrc}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = isCombo ? FALLBACK_COMBO : FALLBACK_PRODUCT; }}
                />
                {isCombo && (
                    <div className="absolute top-0.5 right-0.5 bg-[#facc15] text-red-900 font-black px-1.5 py-0.5 rounded-lg text-[8px]">
                        COMBO
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${isCombo
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        : 'bg-orange-50 text-[#fb923c] border border-orange-100'
                    }`}>
                        {item.tipo}
                    </span>
                    {item.category && (
                        <span className="text-[10px] text-gray-400 font-bold uppercase">
                            {item.category}
                        </span>
                    )}
                </div>
                <h3 className="text-sm font-black italic uppercase leading-tight line-clamp-1 text-gray-800">
                    {item.name}
                </h3>
                <p className="text-sm font-black text-[#e11d48] mt-0.5">
                    {formatCurrency(item.precio)}
                </p>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={() => onUpdateQuantity(item._id, item.tipo, item.cantidad - 1)}
                    className="w-7 h-7 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-[#e11d48] hover:text-[#e11d48] transition-colors text-xs"
                >&#8722;</button>
                <span className="w-6 text-center font-bold text-sm">{item.cantidad}</span>
                <button
                    onClick={() => onUpdateQuantity(item._id, item.tipo, item.cantidad + 1)}
                    className="w-7 h-7 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-[#e11d48] hover:text-[#e11d48] transition-colors text-xs"
                >+</button>
            </div>

            {/* Subtotal y eliminar */}
            <div className="text-right shrink-0 min-w-[80px]">
                <p className="font-black text-sm text-gray-800">{formatCurrency(item.precio * item.cantidad)}</p>
                <button
                    onClick={() => onRemove(item._id, item.tipo)}
                    className="text-[11px] text-red-400 hover:text-red-600 font-bold transition-colors"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};
