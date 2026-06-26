'use strict';

import { useEffect, useState, useMemo } from 'react';
import {
    TicketIcon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { CouponCard } from './CouponCard.jsx';
import { CouponLookupModal } from './CouponLookupModal.jsx';
import { useCouponStore } from '../../auth/store/clientStore.js';

export const CouponsView = () => {
    const coupons = useCouponStore((s) => s.coupons);
    const loading = useCouponStore((s) => s.loading);
    const getCoupons = useCouponStore((s) => s.getCoupons);

    const [search, setSearch] = useState('');
    const [lookupOpen, setLookupOpen] = useState(false);

    useEffect(() => {
        getCoupons();
    }, [getCoupons]);

    const filtered = useMemo(() => {
        const q = search.trim().toUpperCase();
        if (!q) return coupons;
        return coupons.filter((c) => c.code.includes(q));
    }, [coupons, search]);

    const sorted = useMemo(() => {
        const available = filtered.filter((c) => c.usedCount < c.usageLimit);
        const full = filtered.filter((c) => c.usedCount >= c.usageLimit);
        return [...available, ...full];
    }, [filtered]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                        <TicketIcon className="w-7 h-7 text-[#e11d48]" />
                        Cupones de descuento
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Cupones disponibles para aplicar en tu próximo pedido
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={() => setLookupOpen(true)}
                >
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    Verificar código
                </Button>
            </div>

            <div className="bg-linear-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl px-5 py-4 mb-6 flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                    <p className="text-sm font-bold text-[#7f1d1d]">¿Cómo usar un cupón?</p>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        Copia el código del cupón que desees usar y pégalo en el campo de cupón
                        durante el proceso de generar una orden. El descuento se aplicará automáticamente
                        al total de tu pedido.
                    </p>
                </div>
            </div>

            {!loading && coupons.length > 0 && (
                <div className="relative mb-6">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por código (ej. PROMO10)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value.toUpperCase())}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl
                                   text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-red-100
                                   uppercase tracking-wider font-medium transition-all"
                    />
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <Spinner size="lg" />
                </div>
            ) : sorted.length === 0 ? (
                search ? (
                    <EmptyState
                        icon="🔍"
                        title="Sin resultados"
                        description={`No se encontró ningún cupón con el código "${search}".`}
                        action={
                            <Button variant="ghost" onClick={() => setSearch('')}>
                                Limpiar búsqueda
                            </Button>
                        }
                    />
                ) : (
                    <EmptyState
                        icon={<TicketIcon className="w-12 h-12 text-gray-300 mx-auto" />}
                        title="Sin cupones disponibles"
                        description="En este momento no hay cupones activos. ¡Vuelve pronto para encontrar descuentos!"
                    />
                )
            ) : (
                <>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">
                        {sorted.length} cupón{sorted.length !== 1 ? 'es' : ''} disponible{sorted.length !== 1 ? 's' : ''}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sorted.map((coupon) => (
                            <CouponCard
                                key={coupon._id}
                                coupon={coupon}
                            />
                        ))}
                    </div>
                </>
            )}

            <CouponLookupModal
                open={lookupOpen}
                onClose={() => setLookupOpen(false)}
            />
        </div>
    );
};
