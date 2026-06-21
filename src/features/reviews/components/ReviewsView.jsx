'use strict';

import { useEffect, useMemo, useState } from 'react';

import { FullPageSpinner } from '../../../shared/ui/Spinner.jsx';

import { ReviewHeader } from './ReviewHeader.jsx';
import { ReviewTabs } from './ReviewTabs.jsx';
import { ReviewGrid } from './ReviewGrid.jsx';
import { ReviewModal } from './ReviewModal.jsx';
import { PendingOrdersGrid } from './PendingOrdersGrid.jsx';
import { CreateReviewModal } from './CreateReviewModal.jsx';

import { useReviewActions } from '../hooks/useReviewActions.js';

export const ReviewsView = () => {

    const [activeTab, setActiveTab] = useState('REVIEWS');

    const [selectedReview, setSelectedReview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const {
        reviews,
        pendingOrders,
        loading,
        loadData,
        createReview,
        editReview,
        toggleReviewStatus
    } = useReviewActions();

    useEffect(() => {
        loadData();
    }, []);

    const stats = useMemo(() => {
        const active = reviews.filter((review) => !review.isDeleted);
        const total = active.length;
        const sum = active.reduce((acc, curr) => acc + curr.rating, 0);
        const average = total > 0 ? (sum / total).toFixed(1) : '0.0';
        return { average, total, pending: pendingOrders.length };
    }, [reviews, pendingOrders]);

    if (loading) {
        return <FullPageSpinner />;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-6 md:space-y-8 animate-fadeIn">

            <ReviewHeader stats={stats} />

            <ReviewTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                pendingCount={pendingOrders.length}
            />

            {activeTab === 'REVIEWS' ? (
                <ReviewGrid
                    reviews={reviews}
                    onEdit={(review) => {
                        setSelectedReview(review);
                        setIsModalOpen(true);
                    }}
                    onToggle={toggleReviewStatus}
                />
            ) : (
                <PendingOrdersGrid
                    orders={pendingOrders}
                    onCreateReview={(order) => {
                        setSelectedOrder(order);
                        setIsCreateOpen(true);
                    }}
                />
            )}

            <ReviewModal
                isOpen={isModalOpen}
                review={selectedReview}
                onClose={() => {
                    setSelectedReview(null);
                    setIsModalOpen(false);
                }}
                onSave={editReview}
            />

            <CreateReviewModal
                isOpen={isCreateOpen}
                order={selectedOrder}
                onClose={() => {
                    setSelectedOrder(null);
                    setIsCreateOpen(false);
                }}
                onSave={createReview}
            />

        </div>
    );
};