'use strict';

import { Button } from '../../../shared/ui/Button.jsx';
import { Badge } from '../../../shared/ui/Badge.jsx';
import { formatCurrency, formatDateShort } from '../../../shared/utils/formatters.js';

const ORDER_TYPE_LABELS = {
    DELIVERY: { label: 'A domicilio', icon: '🛵' },
    TAKEAWAY: { label: 'Para recoger', icon: '🥡' }
};

export const PendingOrderCard = ({
    order,
    onCreateReview
}) => {

    const typeInfo = ORDER_TYPE_LABELS[order.orderType] || { label: order.orderType, icon: '📦' };

    return (
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-orange-100 transition-all hover:shadow-md flex flex-col justify-between">

            <div>
                <div className="flex justify-between items-start mb-3 gap-2">
                    <span className="text-2xl">{typeInfo.icon}</span>
                    <Badge variant="success">Entregado</Badge>
                </div>

                <h3 className="text-base md:text-lg font-black text-gray-800 mb-1">
                    Pedido #{order._id.slice(-6).toUpperCase()}
                </h3>

                <p className="text-sm font-bold text-[#e11d48] mb-1">
                    {order.branch?.name || 'Sucursal'}
                </p>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                    {typeInfo.label} · {formatDateShort(order.createdAt)}
                </p>

                <p className="text-sm font-black text-gray-700">
                    {formatCurrency(order.total)}
                </p>
            </div>

            <Button
                className="w-full mt-5"
                onClick={() => onCreateReview(order)}
            >
                ★ Dejar reseña
            </Button>

        </div>
    );
};
