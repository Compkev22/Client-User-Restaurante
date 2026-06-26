'use strict';

import { useState } from 'react';

import { Button } from '../../../shared/ui/Button.jsx';
import { TextArea } from '../../../shared/ui/TextArea.jsx';

const ORDER_TYPE_LABELS = {
    DELIVERY: 'A domicilio',
    TAKEAWAY: 'Para recoger'
};

export const CreateReviewModal = ({
    isOpen,
    order,
    onClose,
    onSave
}) => {

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [saving, setSaving] = useState(false);

    if (!isOpen || !order) return null;

    const handleClose = () => {
        setRating(5);
        setComment('');
        onClose();
    };

    const handleSubmit = async () => {
        setSaving(true);

        const success = await onSave({
            orderRequestId: order._id,
            rating,
            comment
        });

        setSaving(false);

        if (success) {
            setRating(5);
            setComment('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">

                <header className="bg-[#e11d48] px-6 md:px-8 py-5 md:py-6 text-white flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">
                            Deja tu reseña
                        </h2>
                        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-0.5">
                            Pedido #{order._id.slice(-6).toUpperCase()} · {ORDER_TYPE_LABELS[order.orderType] || order.orderType}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 font-light text-2xl transition-colors shrink-0"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </header>

                <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6 space-y-5">

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
                        label="Comentario (opcional)"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Cuéntanos qué te pareció el pedido, el tiempo de entrega, la comida..."
                    />

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            className="flex-1"
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            className="flex-[2]"
                            loading={saving}
                            onClick={handleSubmit}
                        >
                            Publicar reseña
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};
