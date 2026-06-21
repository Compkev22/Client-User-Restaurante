'use strict';

import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { ReviewCard } from './ReviewCard.jsx';

export const ReviewGrid = ({
    reviews = [],
    onEdit,
    onToggle
}) => {

    if (!reviews.length) {
        return (
            <EmptyState
                icon="⭐"
                title="Sin reseñas todavía"
                description="Cuando reseñes un pedido entregado, aparecerá aquí."
            />
        );
    }

    return (
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
                <ReviewCard
                    key={review._id}
                    review={review}
                    onEdit={onEdit}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};
