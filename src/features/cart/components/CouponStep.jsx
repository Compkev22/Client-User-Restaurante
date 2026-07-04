'use strict';

import { useState } from 'react';
import { MagnifyingGlassIcon, CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../../../shared/ui/Button.jsx';
import { formatCurrency } from '../../../shared/utils/formatters.js';
import { useCouponStore } from '../../auth/store/clientStore.js';

export const CouponStep = ({ appliedCoupon, onApply, onRemove, rawTotal, onConfirm, onBack }) => {
    const getCouponByCode = useCouponStore((s) => s.getCouponByCode);

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleApply = async () => {
        const trimmed = code.trim().toUpperCase();
        if (!trimmed) return;
        setLoading(true);
        setError('');
        try {
            const coupon = await getCouponByCode(trimmed);
            onApply(coupon);
            setCode('');
        } catch (err) {
            setError(err.response?.data?.message || 'Cupón no válido o inactivo');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleApply();
    };

    const discountAmount = appliedCoupon ? (rawTotal * appliedCoupon.discountPercentage) / 100 : 0;
    const totalConDescuento = rawTotal - discountAmount;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }}>
                        <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4M4 6v12a2 2 0 002 2h14v-4M18 12a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">¿Tienes un cupón?</h1>
                <p className="text-gray-500 text-sm">Ingresa tu código de descuento. Puedes omitir este paso.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto space-y-5">
                {!appliedCoupon ? (
                    <>
                        <div>
                            <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Código de cupón</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(''); }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="PROMO10"
                                    maxLength={15}
                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 uppercase tracking-widest font-bold"
                                />
                                <Button onClick={handleApply} loading={loading} disabled={!code.trim()} className="shrink-0">
                                    <MagnifyingGlassIcon className="w-4 h-4" />
                                    Aplicar
                                </Button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl animate-fadeIn">
                                <XCircleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <p className="font-bold text-red-700 text-sm">{error}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex items-start justify-between gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl animate-fadeIn">
                        <div className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-black text-green-700 text-sm">
                                    Cupón <span className="tracking-widest">{appliedCoupon.code}</span> aplicado
                                </p>
                                <p className="text-green-600 text-xs mt-0.5">{appliedCoupon.discountPercentage}% de descuento</p>
                            </div>
                        </div>
                        <button onClick={onRemove} className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                )}

                <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Total del pedido</span>
                        <span className={appliedCoupon ? 'line-through text-gray-400' : 'font-black text-gray-800'}>
                            {formatCurrency(rawTotal)}
                        </span>
                    </div>
                    {appliedCoupon && (
                        <>
                            <div className="flex justify-between text-sm text-green-600 font-bold">
                                <span>Descuento ({appliedCoupon.discountPercentage}%)</span>
                                <span>- {formatCurrency(discountAmount)}</span>
                            </div>
                            <div className="flex justify-between font-black text-lg text-[#e11d48] border-t border-gray-100 pt-2">
                                <span>Nuevo total</span>
                                <span>{formatCurrency(totalConDescuento)}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex gap-3 pt-2">
                    <Button variant="ghost" className="flex-1" onClick={onBack}>
                        Atras
                    </Button>
                    <Button className="flex-1" onClick={onConfirm}>
                        Continuar
                    </Button>
                </div>
            </div>
        </div>
    );
};