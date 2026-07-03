'use strict';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderRequestStore, useOrderStore, useReviewStore } from '../../auth/store/clientStore.js';
import { getBillingByOrder } from '../../../shared/api/client.js';
import { formatCurrency, formatDate } from '../../../shared/utils/formatters.js';
import { Spinner } from '../../../shared/ui/Spinner.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { CreateReviewModal } from '../../reviews/components/CreateReviewModal.jsx';
import { useReviewActions } from '../../reviews/hooks/useReviewActions.js';

const STATUS_STYLES = {
    'Pendiente':      'bg-yellow-100 text-yellow-700 border border-yellow-200',
    'En Preparacion': 'bg-blue-100 text-blue-700 border border-blue-200',
    'Listo':          'bg-green-100 text-green-700 border border-green-200',
    'Entregado':      'bg-gray-100 text-gray-600 border border-gray-200',
    'Cancelado':      'bg-red-100 text-red-600 border border-red-200',
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

const STEPS_ORDER = ['Pendiente', 'En Preparacion', 'Listo', 'Entregado'];

export const OrderDetailView = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { cancelOrderRequest } = useOrderRequestStore();
    const { getOrderDetails } = useOrderStore();
    const { reviews, getMyReviews } = useReviewStore();
    const { createReview } = useReviewActions();

    const [orderReq, setOrderReq] = useState(null);
    const [details, setDetails] = useState([]);
    const [billing, setBilling] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const store = useOrderRequestStore.getState();
                if (store.orderRequests.length === 0) {
                    await store.getMyOrderRequests();
                }
                const fresh = useOrderRequestStore.getState().orderRequests;
                const found = fresh.find((o) => o._id === orderId);
                setOrderReq(found || null);

                if (found?.order?._id) {
                    const items = await getOrderDetails(found.order._id);
                    setDetails(items || []);

                    if (found.paymentStatus === 'PAID') {
                        try {
                            const billingRes = await getBillingByOrder(found.order._id);
                            setBilling(billingRes.data.data);
                        } catch {
                            setBilling(null);
                        }
                    }
                }
            } catch {
                setOrderReq(null);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId, getOrderDetails]);

    useEffect(() => {
        getMyReviews();
    }, [getMyReviews]);

    const handleCancel = async () => {
        setCancelling(true);
        await cancelOrderRequest(orderId);
        setOrderReq((prev) => prev ? { ...prev, orderStatus: 'Cancelado' } : prev);
        setCancelling(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!orderReq) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10 animate-fadeIn text-center">
                <h2 className="text-xl font-black text-gray-700 mb-4">Pedido no encontrado</h2>
                <Button onClick={() => navigate('/portal/pedidos')}>Volver a Mis Pedidos</Button>
            </div>
        );
    }

    const statusClass = STATUS_STYLES[orderReq.orderStatus] || STATUS_STYLES['Pendiente'];
    const paymentClass = PAYMENT_STYLES[orderReq.paymentStatus] || PAYMENT_STYLES['UNPAID'];
    const currentStep = STEPS_ORDER.indexOf(orderReq.orderStatus);
    const branchName = orderReq.branch?.name || 'Sucursal';
    const orderTotal = orderReq.total || orderReq.order?.total || 0;
    const subtotal = orderTotal / 1.12;
    const iva = orderTotal - subtotal;

    const orderRefId = String(orderReq.order?._id || orderReq.order || '');
    const alreadyReviewed = reviews
        .filter((r) => !r.isDeleted)
        .some((r) => String(r.order?._id || r.order || '') === orderRefId);
    const canReview = orderReq.orderStatus === 'Entregado' && !alreadyReviewed;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 animate-fadeIn space-y-6">
            {/* Header */}
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }}>
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>
                <h1 className="text-2xl font-black text-[#7f1d1d] mb-1">Detalle del Pedido</h1>
                <p className="text-gray-500 text-sm">{formatDate(orderReq.createdAt)}</p>
            </div>

            {/* Estado, tipo y pago */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Sucursal</p>
                        <p className="font-black text-gray-800 italic uppercase">{branchName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase ${paymentClass}`}>
                            {PAYMENT_LABEL[orderReq.paymentStatus] || 'Sin pagar'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase ${statusClass}`}>
                            {orderReq.orderStatus}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Tipo de Pedido</p>
                        <p className="font-bold text-gray-700 text-sm">{TYPE_LABEL[orderReq.orderType]}</p>
                    </div>
                    {orderReq.deliveryAddress && (
                        <div className="text-right max-w-[60%]">
                            <p className="text-xs text-gray-400 font-bold uppercase">Direccion</p>
                            <p className="font-bold text-gray-700 text-sm truncate">{orderReq.deliveryAddress}</p>
                        </div>
                    )}
                </div>

                {/* Barra de progreso */}
                {orderReq.orderStatus !== 'Cancelado' && (
                    <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                            {STEPS_ORDER.map((s, i) => (
                                <div key={s} className="flex flex-col items-center flex-1">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${
                                        i <= currentStep
                                            ? 'bg-[#e11d48] border-[#e11d48] text-white'
                                            : 'bg-gray-100 border-gray-200 text-gray-400'
                                    }`}>
                                        {i < currentStep ? (
                                            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                                                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        ) : (
                                            i + 1
                                        )}
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-400 mt-1 text-center leading-tight">{s}</span>
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#e11d48] rounded-full transition-all duration-500"
                                style={{ width: `${currentStep >= 0 ? ((currentStep + 1) / STEPS_ORDER.length) * 100 : 0}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Items del pedido */}
            {details.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h2 className="font-black text-gray-800 text-sm uppercase mb-4">Productos</h2>
                    <div className="space-y-3">
                        {details.map((item) => {
                            const productName = item.productoId?.nombre || item.comboId?.ComboName || 'Producto';
                            const productType = item.productoId ? 'Individual' : 'Combo';
                            return (
                                <div key={item._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-800 text-sm truncate">{productName}</p>
                                        <p className="text-[11px] text-gray-400">
                                            {item.cantidad} x {formatCurrency(item.precio)} &middot; {productType}
                                        </p>
                                    </div>
                                    <p className="font-black text-gray-800 text-sm shrink-0 ml-3">
                                        {formatCurrency(item.subtotal)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Factura */}
            {billing && (
                <div className="bg-green-50 rounded-2xl border border-green-200 p-5 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-green-600">
                            <path d="M9 14l6-6M5.586 15H21M17.414 15H21M3 3h18v18H3V3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h2 className="font-black text-green-800 text-sm uppercase">Factura</h2>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-green-600 text-white uppercase">
                            {billing.BillStatus === 'PAYED' ? 'Pagada' : 'Generada'}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-[10px] text-green-600 font-bold uppercase">Serie</p>
                            <p className="font-bold text-green-900">{billing.BillSerie}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-green-600 font-bold uppercase">Fecha</p>
                            <p className="font-bold text-green-900">{formatDate(billing.BillDate)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-green-600 font-bold uppercase">Subtotal</p>
                            <p className="font-bold text-green-900">{formatCurrency(billing.BillSubtotal)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-green-600 font-bold uppercase">IVA</p>
                            <p className="font-bold text-green-900">{formatCurrency(billing.BillIVA)}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-green-200 pt-2">
                        <span className="text-xs text-green-600 font-bold uppercase">Metodo de pago</span>
                        <span className="text-xs font-black text-green-800">Tarjeta</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-green-700 font-bold">Total Facturado</span>
                        <span className="text-lg font-black text-green-800">{formatCurrency(billing.BillTotal)}</span>
                    </div>
                </div>
            )}

            {/* Resumen de pago */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-2">
                <h2 className="font-black text-gray-800 text-sm uppercase mb-3">Resumen</h2>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>IVA (12%)</span>
                    <span>{formatCurrency(iva)}</span>
                </div>
                <div className="flex justify-between font-black text-lg text-[#e11d48] border-t border-gray-100 pt-2">
                    <span>Total</span>
                    <span>{formatCurrency(orderTotal)}</span>
                </div>
            </div>

            {/* Reseña */}
            {canReview && (
                <button
                    onClick={() => setIsReviewOpen(true)}
                    className="w-full py-3 rounded-2xl bg-[#facc15] hover:bg-yellow-400 text-red-900 font-black text-sm uppercase tracking-widest transition-all shadow-sm"
                >
                    ★ Dejar reseña
                </button>
            )}

            {/* Acciones */}
            <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => navigate('/portal/pedidos')}>
                    Volver a Mis Pedidos
                </Button>
                {orderReq.orderStatus === 'Pendiente' && orderReq.paymentStatus === 'UNPAID' && (
                    <Button
                        variant="danger"
                        loading={cancelling}
                        onClick={handleCancel}
                    >
                        Cancelar Pedido
                    </Button>
                )}
            </div>

            <CreateReviewModal
                isOpen={isReviewOpen}
                order={orderReq}
                onClose={() => setIsReviewOpen(false)}
                onSave={createReview}
            />
        </div>
    );
};