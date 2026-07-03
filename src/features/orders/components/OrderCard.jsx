'use strict';

import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../../shared/utils/formatters.js';

const STATUS_STYLES = {
    'Pendiente':     'bg-yellow-100 text-yellow-700 border border-yellow-200',
    'En Preparacion': 'bg-blue-100 text-blue-700 border border-blue-200',
    'Listo':         'bg-green-100 text-green-700 border border-green-200',
    'Entregado':     'bg-gray-100 text-gray-600 border border-gray-200',
    'Cancelado':     'bg-red-100 text-red-600 border border-red-200',
};

const PAYMENT_STYLES = {
    'UNPAID':   'bg-red-50 text-red-500 border border-red-200',
    'PAID':     'bg-green-50 text-green-600 border border-green-200',
    'REFUNDED': 'bg-yellow-50 text-yellow-600 border border-yellow-200',
};

const PAYMENT_LABEL = {
    'UNPAID':   'Sin pagar',
    'PAID':     'Pagado',
    'REFUNDED': 'Reembolsado',
};

const TYPE_LABEL = {
    'TAKEAWAY': 'Recoger en sucursal',
    'DELIVERY': 'Envio a domicilio',
};

export const OrderCard = ({ order, onReview }) => {
    const navigate = useNavigate();
    const req = order;

    const statusClass = STATUS_STYLES[req.orderStatus] || STATUS_STYLES['Pendiente'];
    const paymentClass = PAYMENT_STYLES[req.paymentStatus] || PAYMENT_STYLES['UNPAID'];
    const branchName = req.branch?.name || 'Sucursal';
    const orderTotal = req.total || req.order?.total || 0;

    return (
        <div
            onClick={() => navigate(`/portal/pedido/${req._id}`)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-[#e11d48]/30 transition-all duration-300 cursor-pointer animate-fadeIn"
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-black text-gray-800 text-sm uppercase italic truncate">
                            {branchName}
                        </h3>
                        <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${statusClass}`}>
                            {req.orderStatus}
                        </span>
                        <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${paymentClass}`}>
                            {PAYMENT_LABEL[req.paymentStatus] || 'Sin pagar'}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">
                        {TYPE_LABEL[req.orderType] || req.orderType}
                    </p>
                </div>
                <span className="text-lg font-black text-[#e11d48] shrink-0">
                    {formatCurrency(orderTotal)}
                </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold border-t border-gray-50 pt-3">
                <span>{formatDate(req.createdAt)}</span>
                {req.deliveryAddress && (
                    <span className="truncate max-w-[60%] text-right">
                        {req.deliveryAddress}
                    </span>
                )}
            </div>

            {onReview && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onReview();
                    }}
                    className="w-full mt-3 py-2 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-red-900 font-black text-xs uppercase tracking-widest transition-all"
                >
                    ★ Dejar reseña
                </button>
            )}
        </div>
    );
};
