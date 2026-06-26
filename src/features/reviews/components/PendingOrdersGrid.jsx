'use strict';

import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { PendingOrderCard } from './PendingOrderCard.jsx';

export const PendingOrdersGrid = ({
    orders,
    onCreateReview
}) => {

    if (!orders?.length) {
        return (
            <EmptyState
                icon="✅"
                title="No hay pedidos ha reseñar"
                description="Ya reseñaste todos tus pedidos entregados a domicilio o para recoger."
            />
        );
    }

    return (
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map(order => (
                <PendingOrderCard
                    key={order._id}
                    order={order}
                    onCreateReview={onCreateReview}
                />
            ))}
        </div>
    );
};
