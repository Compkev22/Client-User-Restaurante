'use strict';

import { useEffect, useState } from 'react';
import { PlusIcon, TicketIcon } from '@heroicons/react/24/outline';
import { Button } from '../../../shared/components/ui/Button.jsx';
import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import { CouponCard } from './CouponCard.jsx';
import { CouponFormModal } from './CouponFormModal.jsx';
import { useCouponStore } from '../../auth/store/clientStore.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';

export const CouponsView = () => {
    const coupons     = useCouponStore((s) => s.coupons);
    const loading     = useCouponStore((s) => s.loading);
    const getCoupons  = useCouponStore((s) => s.getCoupons);
    const toggleCoupon = useCouponStore((s) => s.deleteCoupon);

    const [modalOpen, setModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getCoupons();
    }, [getCoupons]);

    const handleNew = () => {
        setSelected(null);
        setModalOpen(true);
    };

    const handleEdit = (coupon) => {
        setSelected(coupon);
        setModalOpen(true);
    };

    const handleToggle = async (coupon) => {
        const ok = await toggleCoupon(coupon._id);
        if (ok) {
            showSuccess(
                coupon.status === 'ACTIVE' ? 'Cupón desactivado' : 'Cupón activado'
            );
        } else {
            showError('No se pudo actualizar el cupón');
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Cupones</h1>
                    <p className="text-sm text-gray-500">Administra tus códigos de descuento</p>
                </div>
                <Button onClick={handleNew}>
                    <PlusIcon className="w-4 h-4" />
                    Nuevo Cupón
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-16"><Spinner size="lg" /></div>
            ) : coupons.length === 0 ? (
                <EmptyState
                    icon={<TicketIcon className="w-12 h-12 text-gray-300 mx-auto" />}
                    title="Sin cupones"
                    description="Aún no has creado ningún cupón de descuento."
                    action={<Button onClick={handleNew}>Crear el primero</Button>}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coupons.map((coupon) => (
                        <CouponCard
                            key={coupon._id}
                            coupon={coupon}
                            onEdit={handleEdit}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>
            )}

            <CouponFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                coupon={selected}
            />
        </div>
    );
};