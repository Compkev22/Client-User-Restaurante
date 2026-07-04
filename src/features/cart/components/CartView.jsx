'use strict';

import { useNavigate } from 'react-router-dom';
import { useCartStore, useBranchStore } from '../../auth/store/clientStore.js';
import { EmptyState } from '../../../shared/ui/EmptyState.jsx';
import { Button } from '../../../shared/ui/Button.jsx';
import { CartItem } from './CartItem.jsx';
import { CartSummary } from './CartSummary.jsx';

export const CartView = () => {
    const navigate = useNavigate();
    const cart = useCartStore((s) => s.cart);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const updateCartQuantity = useCartStore((s) => s.updateCartQuantity);
    const clearCart = useCartStore((s) => s.clearCart);
    const getCartTotal = useCartStore((s) => s.getCartTotal);
    const getCartCount = useCartStore((s) => s.getCartCount);
    const selectedBranch = useBranchStore((s) => s.selectedBranch);

    if (cart.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10 animate-fadeIn">
                <EmptyState
                    icon=" "
                    title="Tu carrito esta vacio"
                    description="Agrega productos del menu para comenzar tu pedido."
                    action={<Button onClick={() => navigate('/portal/menu')}>Ver Menu</Button>}
                />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }}>
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Mi Carrito</h1>
                <p className="text-gray-500 text-sm">
                    {getCartCount()} {getCartCount() === 1 ? 'producto' : 'productos'} en tu carrito
                </p>
            </div>

            {selectedBranch && (
                <div className="bg-red-50 border border-[#e11d48]/30 rounded-2xl px-5 py-3 flex items-center justify-between">
                    <p className="text-sm text-[#e11d48] font-bold">
                        Sucursal: <span className="font-black">{selectedBranch.name}</span> — Zona {selectedBranch.zone}
                    </p>
                    <Button size="sm" variant="ghost" onClick={clearCart}>
                        Vaciar carrito
                    </Button>
                </div>
            )}

            <div className="space-y-4">
                {cart.map((item) => (
                    <CartItem
                        key={`${item._id}-${item.tipo}`}
                        item={item}
                        onUpdateQuantity={updateCartQuantity}
                        onRemove={removeFromCart}
                    />
                ))}
            </div>

            <CartSummary total={getCartTotal()} onClear={clearCart} />
        </div>
    );
};
