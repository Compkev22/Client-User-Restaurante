'use strict';

import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { ReviewCard } from './ReviewCard.jsx';
import ReviewsIcon from '../../../assets/icons/Reviews.svg';

export const ReviewGrid = ({
    reviews = [],
    onEdit,
    onToggle
}) => {

    if (!reviews.length) {
        return (
            <EmptyState
                icon={
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                        <img src={ReviewsIcon} alt="Reseñas" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                }
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
