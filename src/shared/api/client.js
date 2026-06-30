'use strict';

import { axiosClient } from './api.js';

// ================= SYNC PERFIL (Mongo, vinculado por authId) =================
export const syncProfile = async (data) => await axiosClient.post('/users/sync', data);

// ================= MENÚ (SOLO LECTURA) =================
export const getMenu = async (branchId) => await axiosClient.get('/menu', { params: { branchId } });

// ================= PRODUCTOS =================
export const getProducts = async (params) => await axiosClient.get('/products', { params });

// ================= COMBOS =================
export const getCombos = async (params) => await axiosClient.get('/combos', { params });
export const getComboById = async (id) => await axiosClient.get(`/combos/${id}`);

// ================= SUCURSALES =================
export const getBranches = async (params) => await axiosClient.get('/branches', { params });

// ================= MESAS =================
export const getTables = async (params) => await axiosClient.get('/tables', { params });

// ================= SERVICIOS ADICIONALES =================
export const getAdditionalServices = async () => await axiosClient.get('/AS');

// ================= CUPONES =================
export const getCoupons = async () => await axiosClient.get('/coupons');
export const getCouponById = async (id) => await axiosClient.get(`/coupons/${id}`);
export const getCouponByCode = async (code) => await axiosClient.get(`/coupons/code/${code}`);
export const createCoupon = async (data) => await axiosClient.post('/coupons', data);
export const updateCoupon = async (id, data) => await axiosClient.put(`/coupons/${id}`, data);
export const deleteCoupon = async (id) => await axiosClient.patch(`/coupons/${id}/status`);

// ================= ORDER REQUESTS (PEDIDOS DEL CLIENTE) =================
export const createOrderRequest = async (data) => await axiosClient.post('/orderRequests', data);
export const getMyOrderRequests = async () => await axiosClient.get('/orderRequests/mine');
export const cancelOrderRequest = async (id) => await axiosClient.put(`/orderRequests/cancel/${id}`);

// ================= ÓRDENES =================
export const getOrders = async (params) => await axiosClient.get('/orders', { params });
export const getOrderById = async (id) => await axiosClient.get(`/orders/${id}`);

// ================= DETALLES DE ORDEN =================
export const getOrderDetailsByOrder = async (orderId) => await axiosClient.get(`/orderDetails/order/${orderId}`);

export const getTableAvailability = async (branchId, date, time) =>
    await axiosClient.get('/reservations/availability', { params: { branchId, date, time } });
export const getReservations = async (params) => await axiosClient.get('/reservations', { params });
export const createReservation = async (data) => await axiosClient.post('/reservations', data);
export const updateReservation = async (id, data) => await axiosClient.put(`/reservations/${id}`, data);
export const deleteReservation = async (id) => await axiosClient.delete(`/reservations/${id}`);

// ================= EVENTOS =================
export const getEvents = async () => await axiosClient.get('/events');
export const getEventById = async (id) => await axiosClient.get(`/events/${id}`);
export const createEvent = async (data) => await axiosClient.post('/events', data);

// ================= RESEÑAS =================
export const getMyReviews = async () => await axiosClient.get('/reviews/mine');
export const createReview = async (data) => await axiosClient.post('/reviews', data);
export const updateReview = async (id, data) => await axiosClient.put(`/reviews/${id}`, data);
export const deleteReview = async (id) => await axiosClient.patch(`/reviews/${id}/status`);

// ================= FACTURACIÓN =================
export const getBillings = async () => await axiosClient.get('/billings');
export const getBillingById = async (id) => await axiosClient.get(`/billings/${id}`);

// ================= PERFIL (USUARIOS) =================
export const getProfile = async () => await axiosClient.get('/users/profile');
export const updateProfile = async (id, data) => await axiosClient.put(`/users/${id}`, data);