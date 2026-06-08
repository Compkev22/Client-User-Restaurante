'use strict';

import { axiosClient } from './api.js';

// ─────────────────────────────────────────────
// USUARIOS
// ─────────────────────────────────────────────
export const getProfileRequest = () =>
    axiosClient.get('/users/profile');

export const updateProfileRequest = (id, data) =>
    axiosClient.put(`/users/${id}`, data);

// ─────────────────────────────────────────────
// MENÚ
// ─────────────────────────────────────────────
export const getMenuRequest = () =>
    axiosClient.get('/menu');

// ─────────────────────────────────────────────
// PRODUCTOS
// ─────────────────────────────────────────────
export const getProductsRequest = (params) =>
    axiosClient.get('/products', { params });

// ─────────────────────────────────────────────
// COMBOS
// ─────────────────────────────────────────────
export const getCombosRequest = (params) =>
    axiosClient.get('/combos', { params });

export const getComboByIdRequest = (id) =>
    axiosClient.get(`/combos/${id}`);

// ─────────────────────────────────────────────
// SUCURSALES
// ─────────────────────────────────────────────
export const getBranchesRequest = () =>
    axiosClient.get('/branches');

// ─────────────────────────────────────────────
// ORDER REQUESTS (pedidos del cliente)
// ─────────────────────────────────────────────
export const createOrderRequestApi = (data) =>
    axiosClient.post('/orderRequests', data);

export const getMyOrderRequestsApi = () =>
    axiosClient.get('/orderRequests/mine');

export const cancelOrderRequestApi = (id) =>
    axiosClient.put(`/orderRequests/cancel/${id}`);

// ─────────────────────────────────────────────
// ÓRDENES
// ─────────────────────────────────────────────
export const getMyOrdersRequest = () =>
    axiosClient.get('/orders');

export const getOrderByIdRequest = (id) =>
    axiosClient.get(`/orders/${id}`);

// ─────────────────────────────────────────────
// DETALLES DE ORDEN
// ─────────────────────────────────────────────
export const getOrderDetailsByOrderRequest = (orderId) =>
    axiosClient.get(`/orderDetails/order/${orderId}`);

// ─────────────────────────────────────────────
// RESERVACIONES
// ─────────────────────────────────────────────
export const getReservationsRequest = () =>
    axiosClient.get('/reservations');

export const createReservationRequest = (data) =>
    axiosClient.post('/reservations', data);

export const updateReservationRequest = (id, data) =>
    axiosClient.put(`/reservations/${id}`, data);

export const cancelReservationRequest = (id) =>
    axiosClient.delete(`/reservations/${id}`);

// ─────────────────────────────────────────────
// EVENTOS
// ─────────────────────────────────────────────
export const getEventsRequest = () =>
    axiosClient.get('/events');

export const getEventByIdRequest = (id) =>
    axiosClient.get(`/events/${id}`);

export const createEventRequest = (data) =>
    axiosClient.post('/events', data);

// ─────────────────────────────────────────────
// RESEÑAS
// ─────────────────────────────────────────────
export const createReviewRequest = (data) =>
    axiosClient.post('/reviews', data);

export const getMyReviewsRequest = () =>
    axiosClient.get('/reviews/mine');

export const updateReviewRequest = (id, data) =>
    axiosClient.put(`/reviews/${id}`, data);

export const deleteReviewRequest = (id) =>
    axiosClient.patch(`/reviews/${id}/status`);

// ─────────────────────────────────────────────
// FACTURACIÓN
// ─────────────────────────────────────────────
export const getMyBillingsRequest = () =>
    axiosClient.get('/billings');

export const getBillingByIdRequest = (id) =>
    axiosClient.get(`/billings/${id}`);

// ─────────────────────────────────────────────
// SERVICIOS ADICIONALES
// ─────────────────────────────────────────────
export const getAdditionalServicesRequest = () =>
    axiosClient.get('/AS');

// ─────────────────────────────────────────────
// MESAS
// ─────────────────────────────────────────────
export const getTablesRequest = (params) =>
    axiosClient.get('/tables', { params });