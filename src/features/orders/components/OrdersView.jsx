'use strict';

import { useEffect, useState } from 'react';
import { useOrderRequestStore, useReviewStore } from '../../auth/store/clientStore.js';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { OrderCard } from './OrderCard.jsx';
import { CreateReviewModal } from '../../reviews/components/CreateReviewModal.jsx';
import { useReviewActions } from '../../reviews/hooks/useReviewActions.js';

export const OrdersView = () => {
    const { orderRequests, loading, getMyOrderRequests } = useOrderRequestStore();
    const { reviews, getMyReviews } = useReviewStore();
    const { createReview } = useReviewActions();

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    useEffect(() => {
        getMyOrderRequests();
        getMyReviews();
    }, [getMyOrderRequests, getMyReviews]);

    const reviewedIds = new Set(
        reviews.filter(r => !r.isDeleted).map(r => String(r.order?._id || r.order || ''))
    );

    const sorted = [...orderRequests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (loading) {
        return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }}>
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
                        <path d="M9 14l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Mis Pedidos</h1>
                <p className="text-gray-500 text-sm">
                    {orderRequests.length} {orderRequests.length === 1 ? 'pedido' : 'pedidos'} realizados
                </p>
            </div>

            {sorted.length === 0 ? (
                <EmptyState
                    icon=" "
                    title="Sin pedidos aun"
                    description="Tus pedidos apareceran aqui una vez que realices uno."
                />
            ) : (
                <div className="space-y-4">
                    {sorted.map((order) => {
                        const orderId = String(order.order?._id || order.order || '');
                        const canReview = order.orderStatus === 'Entregado' && !reviewedIds.has(orderId);
                        return (
                            <OrderCard
                                key={order._id}
                                order={order}
                                onReview={canReview ? () => { setSelectedOrder(order); setIsReviewOpen(true); } : null}
                            />
                        );
                    })}
                </div>
            )}

            <CreateReviewModal
                isOpen={isReviewOpen}
                order={selectedOrder}
                onClose={() => { setSelectedOrder(null); setIsReviewOpen(false); }}
                onSave={createReview}
            />
        </div>
    );
};
