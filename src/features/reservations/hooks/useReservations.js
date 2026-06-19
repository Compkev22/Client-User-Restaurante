'use strict';

import { useState, useEffect, useCallback } from 'react';
import {
    getBranches,
    getTableAvailability,
    createReservation,
    getReservations,
    deleteReservation,
} from '../../../shared/api/client.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';

export const useReservations = () => {
    const [branches, setBranches]             = useState([]);
    const [myReservations, setMyReservations] = useState([]);
    const [loadingPage, setLoadingPage]       = useState(true);

    const [tables, setTables]               = useState([]);
    const [loadingTables, setLoadingTables] = useState(false);
    const [submitting, setSubmitting]       = useState(false);

    // ── Carga inicial: sucursales + mis reservas ──
    const fetchInitial = useCallback(async () => {
        setLoadingPage(true);
        try {
            const [branchesRes, reservationsRes] = await Promise.all([
                getBranches(),
                getReservations(),
            ]);
            setBranches(branchesRes.data?.data || []);
            setMyReservations(reservationsRes.data?.reservations || []);
        } catch (err) {
            showError('No se pudo cargar la información inicial.');
        } finally {
            setLoadingPage(false);
        }
    }, []);

    useEffect(() => { fetchInitial(); }, [fetchInitial]);

    // ── Consulta de disponibilidad de mesas (sucursal + fecha + hora) ──
    const fetchAvailability = useCallback(async (branchId, date, time) => {
        if (!branchId || !date || !time) {
            setTables([]);
            return;
        }
        setLoadingTables(true);
        try {
            const { data } = await getTableAvailability(branchId, date, time);
            setTables(data?.tables || []);
        } catch (err) {
            showError('No se pudo consultar la disponibilidad de mesas.');
            setTables([]);
        } finally {
            setLoadingTables(false);
        }
    }, []);

    const refetchReservations = useCallback(async () => {
        const { data } = await getReservations();
        setMyReservations(data?.reservations || []);
    }, []);

    // ── Crear reservación ──
    const submitReservation = async (payload) => {
        setSubmitting(true);
        try {
            const { data } = await createReservation(payload);
            showSuccess(data?.message || 'Reservación creada exitosamente.');
            await refetchReservations();
            return true;
        } catch (err) {
            const msg = err.response?.data?.message || 'No se pudo crear la reservación.';
            showError(msg);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    // ── Cancelar reservación ──
    const cancelReservation = async (id) => {
        try {
            await deleteReservation(id);
            showSuccess('Reservación cancelada.');
            await refetchReservations();
            return true;
        } catch (err) {
            showError('No se pudo cancelar la reservación.');
            return false;
        }
    };

    const clearTables = useCallback(() => setTables([]), []);

    return {
        branches,
        myReservations,
        loadingPage,
        tables,
        loadingTables,
        submitting,
        fetchAvailability,
        clearTables,
        submitReservation,
        cancelReservation,
    };
};