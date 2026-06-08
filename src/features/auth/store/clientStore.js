'use strict';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginRequest } from '../../../shared/api/index.js';
import { showError, showSuccess } from '../../../shared/utils/toast.js';


export const useClientStore = create(
    persist(
        (set, get) => ({

            // ─── AUTH ───────────────────────────────────────────────────────
            user: null,
            token: null,
            isAuthenticated: false,
            authLoading: false,
            authError: null,

            login: async ({ UserEmail, password }) => {
                set({ authLoading: true, authError: null });
                try {
                    const { data } = await loginRequest({ UserEmail, password });

                    if (data.userDetails?.role !== 'CLIENT') {
                        const msg = 'Acceso denegado. Esta app es exclusiva para clientes.';
                        set({ authLoading: false, authError: msg });
                        showError(msg);
                        return { success: false };
                    }

                    set({
                        user: data.userDetails,
                        token: data.token,
                        isAuthenticated: true,
                        authLoading: false,
                        authError: null,
                    });
                    return { success: true };

                } catch (err) {
                    const status = err.response?.status;
                    const msg =
                        status === 400 ? 'Correo o contraseña incorrectos' :
                        status === 401 ? 'Verifica tu correo antes de iniciar sesión' :
                        status === 403 ? 'Esta app es exclusiva para clientes' :
                                         'Error de conexión. Intenta más tarde.';
                    set({ authLoading: false, authError: msg });
                    showError(msg);
                    return { success: false };
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    authError: null,
                    // Limpiar carrito al cerrar sesión
                    cart: [],
                    cartBranchId: null,
                });
            },

            updateUser: (userData) => {
                set((state) => ({ user: { ...state.user, ...userData } }));
            },

            // ─── CARRITO ────────────────────────────────────────────────────
            // items: [{ _id, nombre, precio, cantidad, tipo: 'product'|'combo', imagen_url, branchId }]
            cart: [],
            cartBranchId: null,

            addToCart: (item) => {
                const { cart, cartBranchId } = get();

                // Conflicto de sucursal
                if (cartBranchId && cartBranchId !== item.branchId) {
                    return { conflict: true };
                }

                const existing = cart.find(
                    (i) => i._id === item._id && i.tipo === item.tipo
                );

                if (existing) {
                    set({
                        cart: cart.map((i) =>
                            i._id === item._id && i.tipo === item.tipo
                                ? { ...i, cantidad: i.cantidad + (item.cantidad || 1) }
                                : i
                        ),
                    });
                } else {
                    set({
                        cart: [...cart, { ...item, cantidad: item.cantidad || 1 }],
                        cartBranchId: item.branchId || cartBranchId,
                    });
                }

                return { conflict: false };
            },

            removeFromCart: (id, tipo) => {
                const cart = get().cart.filter(
                    (i) => !(i._id === id && i.tipo === tipo)
                );
                set({
                    cart,
                    cartBranchId: cart.length === 0 ? null : get().cartBranchId,
                });
            },

            updateCartQuantity: (id, tipo, cantidad) => {
                if (cantidad < 1) return;
                set({
                    cart: get().cart.map((i) =>
                        i._id === id && i.tipo === tipo ? { ...i, cantidad } : i
                    ),
                });
            },

            clearCart: () => set({ cart: [], cartBranchId: null }),

            getCartTotal: () =>
                get().cart.reduce((acc, i) => acc + i.precio * i.cantidad, 0),

            getCartCount: () =>
                get().cart.reduce((acc, i) => acc + i.cantidad, 0),

            // ─── UI / LOADING GLOBAL ─────────────────────────────────────────
            isLoading: false,
            setLoading: (val) => set({ isLoading: val }),
        }),
        {
            name: 'kinal-client-store',   // Clave en localStorage
            partialize: (state) => ({     // Solo persistir auth y carrito
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                cart: state.cart,
                cartBranchId: state.cartBranchId,
            }),
        }
    )
);