'use strict';

import { useState } from 'react';
import { MagnifyingGlassIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Modal } from '../../../shared/ui/Modal.jsx';
import { Input } from '../../../shared/ui/Input.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { useCouponStore } from '../../auth/store/clientStore.js';

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('es-GT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });

export const CouponLookupModal = ({ open, onClose }) => {
    const getCouponByCode = useCouponStore((s) => s.getCouponByCode);

    const [code,    setCode]    = useState('');
    const [loading, setLoading] = useState(false);
    const [result,  setResult]  = useState(null);

    const handleSearch = async () => {
        const trimmed = code.trim().toUpperCase();
        if (!trimmed) return;
        setLoading(true);
        setResult(null);
        try {
            const coupon = await getCouponByCode(trimmed);
            setResult({ coupon });
        } catch (err) {
            const msg = err.response?.data?.message || 'Cupón no válido o inactivo';
            setResult({ error: msg });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setCode('');
        setResult(null);
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            title="Verificar código de cupón"
        >
            <p className="text-sm text-gray-500 mb-4">
                Ingresa el código del cupón para verificar que sea válido antes de usarlo en tu pedido.
            </p>

            <div className="flex gap-2">
                <Input
                    placeholder="PROMO10"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setResult(null);
                    }}
                    onKeyDown={handleKeyDown}
                    maxLength={15}
                    className="uppercase tracking-widest font-bold"
                />
                <Button
                    onClick={handleSearch}
                    loading={loading}
                    disabled={!code.trim()}
                    className="shrink-0"
                >
                    <MagnifyingGlassIcon className="w-4 h-4" />
                    Buscar
                </Button>
            </div>

            {result?.error && (
                <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl animate-fadeIn">
                    <XCircleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold text-red-700 text-sm">{result.error}</p>
                        <p className="text-red-500 text-xs mt-0.5">
                            Verifica que el código esté escrito correctamente.
                        </p>
                    </div>
                </div>
            )}

            {result?.coupon && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-2xl animate-fadeIn space-y-3">
                    <div className="flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-600 shrink-0" />
                        <p className="font-black text-green-700 text-sm">¡Cupón válido!</p>
                    </div>

                    <div className="bg-white rounded-xl p-3 border border-green-100 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-medium">Código</span>
                            <span className="font-black text-[#e11d48] tracking-widest">
                                {result.coupon.code}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-medium">Descuento</span>
                            <span className="font-black text-gray-800">
                                {result.coupon.discountPercentage}%
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-medium">Válido hasta</span>
                            <span className="font-bold text-gray-700">
                                {formatDate(result.coupon.expirationDate)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-medium">Usos disponibles</span>
                            <span className="font-bold text-gray-700">
                                {result.coupon.usageLimit - result.coupon.usedCount} restantes
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-green-600 font-medium">
                        Ingresa el código <strong>{result.coupon.code}</strong> en el campo de cupón al momento del checkout para aplicar el descuento.
                    </p>
                </div>
            )}

            <div className="mt-5 flex justify-end">
                <Button variant="ghost" onClick={handleClose}>Cerrar</Button>
            </div>
        </Modal>
    );
};
