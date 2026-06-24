'use strict';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as api from '../../../shared/api/client.js';

// ================= MENÚ STORE (Solo Lectura) =================
export const useMenuStore = create((set) => ({
    menuItems: [],
    loading: false,
    error: null,

    getMenu: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getMenu();
            set({ menuItems: res.data.menu, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al cargar el menú',
                loading: false,
            });
        }
    },
}));

// ================= PRODUCTOS STORE (Solo Lectura) =================
export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    getProducts: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getProducts(params);
            set({ products: res.data.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener productos',
                loading: false,
            });
        }
    },
}));

// ================= COMBOS STORE (Solo Lectura) =================
export const useComboStore = create((set, get) => ({
    combos: [],
    loading: false,
    error: null,

    getCombos: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getCombos(params);
            set({ combos: res.data.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener combos',
                loading: false,
            });
        }
    },

    getComboById: async (id) => {
        try {
            const res = await api.getComboById(id);
            return res.data.data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error al obtener el combo' });
            return null;
        }
    },
}));

// ================= SUCURSALES STORE (Solo Lectura + Selección persistida) =================
export const useBranchStore = create(
    persist(
        (set) => ({
            branches: [],
            selectedBranch: null,
            loading: false,
            error: null,

            getBranches: async (params) => {
                try {
                    set({ loading: true, error: null });
                    const res = await api.getBranches(params);
                    set({ branches: res.data.data, loading: false });
                } catch (error) {
                    set({
                        error: error.response?.data?.message || 'Error al obtener sucursales',
                        loading: false,
                    });
                }
            },

            setSelectedBranch: (branch) => set({ selectedBranch: branch }),
            clearSelectedBranch: () => set({ selectedBranch: null }),
        }),
        {
            name: 'client-branch-store',
            partialize: (state) => ({ selectedBranch: state.selectedBranch }),
        }
    )
);

// ================= MESAS STORE (Solo Lectura) =================
export const useTableStore = create((set) => ({
    tables: [],
    loading: false,
    error: null,

    getTables: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getTables(params);
            set({ tables: res.data.tables || [], loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener mesas',
                loading: false,
            });
        }
    },
}));

// ================= SERVICIOS ADICIONALES STORE (Solo Lectura) =================
export const useAdditionalServiceStore = create((set) => ({
    additionalServices: [],
    loading: false,
    error: null,

    getAdditionalServices: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getAdditionalServices();
            set({ additionalServices: res.data.data, loading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    'Error al obtener los servicios adicionales',
                loading: false,
            });
        }
    },
}));

// ================= CUPONES STORE =================
export const useCouponStore = create((set, get) => ({
    coupons: [],
    loading: false,
    error: null,

    getCoupons: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getCoupons();
            set({ coupons: res.data.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener cupones',
                loading: false,
            });
        }
    },

    getCouponByCode: async (code) => {
        try {
            const res = await api.getCouponByCode(code);
            return res.data.data;
        } catch (error) {
            throw error;
        }
    },

    createCoupon: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createCoupon(data);
            set({ coupons: [res.data.data, ...get().coupons], loading: false });
            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al crear cupón',
                loading: false,
            });
            throw error;
        }
    },

    updateCoupon: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateCoupon(id, data);
            set({
                coupons: get().coupons.map((c) => (c._id === id ? res.data.data : c)),
                loading: false,
            });
            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar cupón',
                loading: false,
            });
            throw error;
        }
    },

    deleteCoupon: async (id) => {
        try {
            set({ loading: true, error: null });
            const res = await api.deleteCoupon(id);
            set({
                coupons: get().coupons.map((c) => (c._id === id ? res.data.data : c)),
                loading: false,
            });
            return true;
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    'Error al cambiar el estado del cupón',
                loading: false,
            });
            return false;
        }
    },
}));

// ================= RESERVATIONS STORE =================
export const useReservationStore = create((set, get) => ({
    reservations: [],
    loading: false,
    error: null,

    getReservations: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getReservations(params);
            set({ reservations: res.data.reservations || [], loading: false });
        } catch (error) {
            set({
                reservations: [],
                error:
                    error.response?.data?.message || 'Error al obtener reservaciones',
                loading: false,
            });
        }
    },

    createReservation: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createReservation(data);
            set({
                reservations: [res.data.data, ...get().reservations],
                loading: false,
            });
            return res.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al crear reservación',
                loading: false,
            });
            throw error;
        }
    },

    updateReservation: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateReservation(id, data);
            set({
                reservations: get().reservations.map((r) =>
                    r._id === id ? res.data.updated : r,
                ),
                loading: false,
            });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || 'Error al actualizar reservación',
                loading: false,
            });
            throw error;
        }
    },

    deleteReservation: async (id) => {
        try {
            set({ loading: true, error: null });
            await api.deleteReservation(id);
            // El controlador hace un toggle/cancel; recargamos para reflejar el cambio
            await get().getReservations();
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    'Error al cancelar la reservación',
                loading: false,
            });
        }
    },
}));

// ================= EVENTS STORE =================
export const useEventStore = create((set, get) => ({
    events: [],
    loading: false,
    error: null,

    getEvents: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getEvents();
            set({ events: res.data.data, loading: false });
        } catch (error) {
            set({
                events: [],
                error: error.response?.data?.message || 'Error al obtener eventos',
                loading: false,
            });
        }
    },

    getEventById: async (id) => {
        try {
            const res = await api.getEventById(id);
            return res.data.data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error al obtener el evento' });
            return null;
        }
    },

    createEvent: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createEvent(data);
            set({ events: [res.data.data, ...get().events], loading: false });
            return res.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al crear el evento',
                loading: false,
            });
            throw error;
        }
    },
}));

// ================= REVIEWS STORE =================
export const useReviewStore = create((set, get) => ({
    reviews: [],
    loading: false,
    error: null,

    getMyReviews: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getMyReviews();
            set({ reviews: res.data.data, loading: false });
        } catch (error) {
            set({
                reviews: [],
                error: error.response?.data?.message || 'Error al obtener tus reseñas',
                loading: false,
            });
        }
    },

    createReview: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createReview(data);
            set({ reviews: [res.data.data, ...get().reviews], loading: false });
            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al crear la reseña',
                loading: false,
            });
            throw error;
        }
    },

    updateReview: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateReview(id, data);
            set({
                reviews: get().reviews.map((r) => (r._id === id ? res.data.data : r)),
                loading: false,
            });
            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar la reseña',
                loading: false,
            });
            throw error;
        }
    },

    deleteReview: async (id) => {
        try {
            set({ loading: true, error: null });
            await api.deleteReview(id);
            set({
                reviews: get().reviews.filter((r) => r._id !== id),
                loading: false,
            });
            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al eliminar la reseña',
                loading: false,
            });
            return false;
        }
    },
}));

// ================= BILLING STORE =================
export const useBillingStore = create((set) => ({
    billings: [],
    loading: false,
    error: null,

    getBillings: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getBillings();
            set({ billings: res.data.data || [], loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener facturas',
                loading: false,
            });
        }
    },

    getBillingById: async (id) => {
        try {
            const res = await api.getBillingById(id);
            return res.data.data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error al obtener la factura' });
            return null;
        }
    },
}));

// ================= ORDER STORE =================
export const useOrderStore = create((set) => ({
    orders: [],
    currentOrderDetails: [],
    loading: false,
    error: null,

    getOrders: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getOrders(params);
            set({ orders: res.data.data, loading: false });
        } catch (error) {
            set({
                orders: [],
                error: error.response?.data?.message || 'Error al obtener tus órdenes',
                loading: false,
            });
        }
    },

    getOrderById: async (id) => {
        try {
            const res = await api.getOrderById(id);
            return res.data.data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error al obtener la orden' });
            return null;
        }
    },

    getOrderDetails: async (orderId) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getOrderDetailsByOrder(orderId);
            set({ currentOrderDetails: res.data.data, loading: false });
            return res.data.data;
        } catch (error) {
            set({
                currentOrderDetails: [],
                error: 'Error al obtener detalles de la orden',
                loading: false,
            });
            return [];
        }
    },
}));

// ================= ORDER REQUEST STORE (Pedidos del Cliente) =================
export const useOrderRequestStore = create((set, get) => ({
    orderRequests: [],
    loading: false,
    error: null,

    getMyOrderRequests: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getMyOrderRequests();
            set({ orderRequests: res.data.data, loading: false });
        } catch (error) {
            set({
                orderRequests: [],
                error: error.response?.data?.message || 'Error al obtener tus pedidos',
                loading: false,
            });
        }
    },

    createOrderRequest: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createOrderRequest(data);
            set({
                orderRequests: [res.data.data, ...get().orderRequests],
                loading: false,
            });
            return res.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al crear el pedido',
                loading: false,
            });
            throw error;
        }
    },

    cancelOrderRequest: async (id) => {
        try {
            set({ loading: true, error: null });
            const res = await api.cancelOrderRequest(id);
            set({
                orderRequests: get().orderRequests.map((o) =>
                    o._id === id ? res.data.data : o,
                ),
                loading: false,
            });
            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al cancelar el pedido',
                loading: false,
            });
            return false;
        }
    },
}));

// ================= PROFILE STORE (Mi Perfil) =================
export const useProfileStore = create((set) => ({
    profile: null,
    loading: false,
    error: null,

    getProfile: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getProfile();
            set({ profile: res.data.user, loading: false });
            return res.data.user;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener el perfil',
                loading: false,
            });
            return null;
        }
    },

    updateProfile: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateProfile(id, data);
            set({ profile: res.data.data, loading: false });
            return res.data.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar el perfil',
                loading: false,
            });
            throw error;
        }
    },
}));

// ================= CART STORE (Carrito — persistido) =================
export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            cartBranchId: null,

            addToCart: (item) => {
                const { cart, cartBranchId } = get();

                if (cartBranchId && cartBranchId !== item.branchId) {
                    return { conflict: true };
                }

                const existing = cart.find(
                    (i) => i._id === item._id && i.tipo === item.tipo,
                );

                if (existing) {
                    set({
                        cart: cart.map((i) =>
                            i._id === item._id && i.tipo === item.tipo
                                ? { ...i, cantidad: i.cantidad + (item.cantidad || 1) }
                                : i,
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
                    (i) => !(i._id === id && i.tipo === tipo),
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
                        i._id === id && i.tipo === tipo ? { ...i, cantidad } : i,
                    ),
                });
            },

            clearCart: () => set({ cart: [], cartBranchId: null }),

            getCartTotal: () =>
                get().cart.reduce((acc, i) => acc + i.precio * i.cantidad, 0),

            getCartCount: () =>
                get().cart.reduce((acc, i) => acc + i.cantidad, 0),
        }),
        {
            name: 'client-cart-store',
            partialize: (state) => ({
                cart: state.cart,
                cartBranchId: state.cartBranchId,
            }),
        },
    ),
);