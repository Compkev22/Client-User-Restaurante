'use strict';

import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../auth/store/clientStore.js';
import { formatCurrency } from '../../../shared/utils/formatters.js';
import { EmptyState } from '../../../shared/ui/EmptyState.jsx';

export const CartView = () => {
    const navigate = useNavigate();
    const cart               = useCartStore((s) => s.cart);
    const removeFromCart     = useCartStore((s) => s.removeFromCart);
    const updateCartQuantity = useCartStore((s) => s.updateCartQuantity);
    const clearCart          = useCartStore((s) => s.clearCart);
    const getCartTotal       = useCartStore((s) => s.getCartTotal);

    if (cart.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10 animate-fadeIn">
                <EmptyState
                    icon="🛒"
                    title="Tu carrito está vacío"
                    description="Agrega productos del menú para comenzar tu pedido."
                    action={
                        <button
                            onClick={() => navigate('/portal/menu')}
                            className="bg-[#e11d48] hover:bg-[#be123c] text-white font-black py-3 px-8 rounded-xl transition-all"
                        >
                            Ver Menú
                        </button>
                    }
                />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 animate-fadeIn">
            <h1 className="text-2xl font-black text-[#7f1d1d] mb-6">Mi Carrito</h1>

            <div className="space-y-4 mb-8">
                {cart.map((item) => (
                    <div
                        key={`${item._id}-${item.tipo}`}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
                    >
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800">{item.nombre}</h3>
                            <p className="text-sm text-gray-500 capitalize">{item.tipo}</p>
                            <p className="text-[#e11d48] font-black">{formatCurrency(item.precio)}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateCartQuantity(item._id, item.tipo, item.cantidad - 1)}
                                className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-[#e11d48] hover:text-[#e11d48] transition-colors"
                            >−</button>
                            <span className="w-8 text-center font-bold">{item.cantidad}</span>
                            <button
                                onClick={() => updateCartQuantity(item._id, item.tipo, item.cantidad + 1)}
                                className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-[#e11d48] hover:text-[#e11d48] transition-colors"
                            >+</button>
                        </div>

                        <div className="text-right">
                            <p className="font-black text-gray-800">{formatCurrency(item.precio * item.cantidad)}</p>
                            <button
                                onClick={() => removeFromCart(item._id, item.tipo)}
                                className="text-xs text-red-400 hover:text-red-600 transition-colors mt-1"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-gray-700">Total</span>
                    <span className="text-2xl font-black text-[#e11d48]">{formatCurrency(getCartTotal())}</span>
                </div>
                <button
                    onClick={() => navigate('/portal/checkout')}
                    className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white font-black py-3 rounded-xl transition-all"
                >
                    Proceder al Checkout
                </button>
                <button onClick={clearCart} className="w-full mt-2 text-sm text-gray-500 hover:text-red-500 transition-colors">
                    Vaciar carrito
                </button>
            </div>
        </div>
    );
};