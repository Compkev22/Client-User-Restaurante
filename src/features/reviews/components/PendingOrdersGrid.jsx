'use strict';

import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { PendingOrderCard } from './PendingOrderCard.jsx';
import CheckIcon from '../../../assets/icons/Check.svg';

export const PendingOrdersGrid = ({
    orders,
    onCreateReview
}) => {

    if (!orders?.length) {
        return (
            <EmptyState
                icon={
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                        <img src={CheckIcon} alt="Check" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                }
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
