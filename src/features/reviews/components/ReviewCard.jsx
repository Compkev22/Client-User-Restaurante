'use strict';

import { Button } from '../../../shared/ui/Button.jsx';
import { Badge } from '../../../shared/ui/Badge.jsx';
import { formatDateShort } from '../../../shared/utils/formatters.js';

export const ReviewCard = ({
    review,
    onEdit,
    onToggle
}) => {
    return (
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-orange-100 transition-all hover:shadow-md flex flex-col justify-between">

            <div>
                <div className="flex justify-between items-start mb-3 gap-2">
                    <div className="flex text-lg gap-0.5 shrink-0">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={i < review.rating ? 'text-[#facc15]' : 'text-gray-200'}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <Badge variant={review.isDeleted ? 'danger' : 'success'}>
                        {review.isDeleted ? 'Eliminada' : 'Activa'}
                    </Badge>
                </div>

                <h3 className="text-base md:text-lg font-black text-gray-800 mb-1 truncate">
                    {review.branch?.name || 'Sucursal'}
                </h3>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                    {formatDateShort(review.createdAt)}
                </p>

                <p className="text-gray-500 text-sm italic leading-relaxed line-clamp-3">
                    {review.comment
                        ? `"${review.comment}"`
                        : 'Sin comentario.'}
                </p>
            </div>

            <div className="flex gap-2 mt-5">

                {!review.isDeleted && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => onEdit(review)}
                    >
                        Editar
                    </Button>
                )}

                <Button
                    variant={review.isDeleted ? 'secondary' : 'danger'}
                    size="sm"
                    className="flex-1"
                    onClick={() => onToggle(review._id)}
                >
                    {review.isDeleted ? 'Restaurar' : 'Eliminar'}
                </Button>

            </div>

        </div>
    );
};
