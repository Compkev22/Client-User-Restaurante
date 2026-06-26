'use strict';

import { useEffect, useState } from 'react';

import { Button } from '../../../shared/ui/Button.jsx';
import { TextArea } from '../../../shared/ui/TextArea.jsx';

export const ReviewModal = ({
    isOpen,
    review,
    onClose,
    onSave
}) => {

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (review) {
            setRating(review.rating);
            setComment(review.comment || '');
        }
    }, [review]);

    if (!isOpen || !review) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const success = await onSave(
            review._id,
            { rating, comment }
        );

        setSaving(false);

        if (success) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">

                <header className="bg-gray-900 px-6 md:px-8 py-5 md:py-6 text-white flex justify-between items-center shrink-0">
                    <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">
                        Editar reseña
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 font-light text-2xl transition-colors shrink-0"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 md:px-8 py-6 space-y-5">

                    <div className="bg-orange-50 rounded-3xl p-6 text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                            ¿Cómo calificas tu experiencia?
                        </p>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="text-4xl md:text-5xl transition-transform hover:scale-110"
                                >
                                    <span className={star <= rating ? 'text-[#facc15]' : 'text-gray-200'}>
                                        ★
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <TextArea
                        label="Comentario"
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Cuéntanos qué te pareció el pedido..."
                    />

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            className="flex-1"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="flex-[2]"
                            loading={saving}
                        >
                            Guardar cambios
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};
