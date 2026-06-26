'use strict';

import { useReviewStore } from '../../auth/store/clientStore.js';
import { useOrderRequestStore } from '../../auth/store/clientStore.js';

import {
    showSuccess,
    showError
} from '../../../shared/utils/toast.js';

export const useReviewActions = () => {

    const reviewStore = useReviewStore();
    const orderStore = useOrderRequestStore();

    const loadData = async () => {
        await reviewStore.getMyReviews();
        await orderStore.getMyOrderRequests();
    };

    // Review.order y OrderRequest.order apuntan al mismo documento Order
    // (cada OrderRequest crea su propio Order 1:1). Ambos pueden venir
    // poblados (objeto con _id) o como string ID plano, según el endpoint.
    const getOrderId = (value) => String(value?._id || value || '');

    const reviewedOrderIds = new Set(
        reviewStore.reviews
            // Solo cuentan como "ya reseñado" las reseñas activas.
            // Si está eliminada (soft delete), el pedido debe volver a aparecer como pendiente.
            .filter(review => !review.isDeleted)
            .map(review => getOrderId(review.order))
    );

    const pendingOrders = orderStore.orderRequests.filter(
        order =>
            order.orderStatus === 'Entregado' &&
            !reviewedOrderIds.has(getOrderId(order.order))
    );

    const createReview = async (data) => {

        try {

            await reviewStore.createReview(data);

            await loadData();

            showSuccess('Reseña creada');

            return true;

        } catch (error) {

            showError(
                error.response?.data?.message ||
                'Error al crear reseña'
            );

            return false;
        }
    };

    const editReview = async (id, data) => {

        try {

            await reviewStore.updateReview(id, data);

            await reviewStore.getMyReviews();

            showSuccess('Reseña actualizada');

            return true;

        } catch (error) {

            showError(
                error.response?.data?.message ||
                'Error al actualizar reseña'
            );

            return false;
        }
    };

    const toggleReviewStatus = async (id) => {

        const success =
            await reviewStore.deleteReview(id);

        if (success) {

            await reviewStore.getMyReviews();

            showSuccess('Estado actualizado');

        } else {

            showError('No se pudo actualizar');
        }
    };

    return {
        reviews: reviewStore.reviews,
        pendingOrders,
        loading:
            reviewStore.loading ||
            orderStore.loading,
        loadData,
        createReview,
        editReview,
        toggleReviewStatus
    };
};