'use strict';

import { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline';
import { Badge } from '../../../shared/ui/Badge.jsx';

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('es-GT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    });

const isExpiringSoon = (dateStr) => {
    const diff = new Date(dateStr) - new Date();
    return diff > 0 && diff < 1000 * 60 * 60 * 24 * 7; // menos de 7 días
};

const usagePercent = (used, limit) =>
    Math.min(100, Math.round((used / limit) * 100));

export const CouponCard = ({ coupon, onApply }) => {
    const [copied, setCopied] = useState(false);

    const percent    = usagePercent(coupon.usedCount, coupon.usageLimit);
    const expiringSoon = isExpiringSoon(coupon.expirationDate);
    const isFull     = coupon.usedCount >= coupon.usageLimit;

    const handleCopy = () => {
        navigator.clipboard.writeText(coupon.code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden">

            <div className="bg-linear-to-r from-[#e11d48] to-[#fb923c] px-5 py-4 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-0.5">
                        Descuento
                    </p>
                    <p className="text-4xl font-black text-white leading-none">
                        {coupon.discountPercentage}
                        <span className="text-2xl">%</span>
                    </p>
                </div>

                <div className="text-right">
                    {expiringSoon && !isFull && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full uppercase">
                            <FireIcon className="w-3 h-3" />
                            Por vencer
                        </span>
                    )}
                    {isFull && (
                        <Badge variant="danger">Agotado</Badge>
                    )}
                </div>
            </div>

            <div className="px-5 py-4 flex flex-col gap-3 flex-1">

                <div className="flex items-center justify-between bg-[#fdfaf5] border-2 border-dashed border-orange-200 rounded-2xl px-4 py-2.5">
                    <span className="font-black text-[#e11d48] text-lg tracking-[0.2em]">
                        {coupon.code}
                    </span>
                    <button
                        onClick={handleCopy}
                        title="Copiar código"
                        className="ml-2 p-1.5 rounded-lg text-gray-400 hover:text-[#e11d48] hover:bg-red-50 transition-colors"
                    >
                        {copied
                            ? <CheckIcon className="w-4 h-4 text-green-500" />
                            : <ClipboardDocumentIcon className="w-4 h-4" />
                        }
                    </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>
                        Válido hasta{' '}
                        <span className={`font-bold ${expiringSoon ? 'text-orange-500' : 'text-gray-700'}`}>
                            {formatDate(coupon.expirationDate)}
                        </span>
                    </span>
                </div>

                <div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-1">
                        <span>Usos</span>
                        <span>
                            <span className="text-[#fb923c]">{coupon.usedCount}</span>
                            {' / '}
                            {coupon.usageLimit}
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                            className={`h-1.5 rounded-full transition-all ${
                                percent >= 90 ? 'bg-red-400' :
                                percent >= 60 ? 'bg-orange-400' :
                                'bg-green-400'
                            }`}
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                </div>
            </div>

            {onApply && (
                <div className="px-5 pb-5">
                    <button
                        onClick={() => onApply(coupon.code)}
                        disabled={isFull}
                        className="w-full py-2.5 rounded-xl text-sm font-black transition-all
                            bg-[#e11d48] text-white hover:bg-red-700 active:scale-95
                            disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                    >
                        {isFull ? 'Sin disponibilidad' : 'Usar en mi pedido'}
                    </button>
                </div>
            )}
        </div>
    );
};
