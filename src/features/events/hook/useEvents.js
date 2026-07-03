'use strict';

import { useState, useEffect, useCallback } from 'react';
import {
    getEventRequests,
    createEventRequest,
    cancelEventRequest,
    getAdditionalServices as fetchAdditionalServices,
    getBranches as fetchBranches,
} from '../../../shared/api/client.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';

export const useEvents = () => {
    const [eventRequests, setEventRequests] = useState([]);
    const [additionalServices, setAdditionalServices]   = useState([]);
    const [branches, setBranches]           = useState([]);
    const [loadingPage, setLoadingPage]     = useState(true);
    const [submitting, setSubmitting]       = useState(false);

    const fetchAll = useCallback(async () => {
        setLoadingPage(true);
        try {
            const [reqRes, svcRes, branchRes] = await Promise.all([
                getEventRequests(),
                fetchAdditionalServices(),
                fetchBranches(),
            ]);
            setEventRequests(reqRes.data?.data || []);
            setAdditionalServices(svcRes.data?.data || []);
            setBranches(branchRes.data?.data || []);
        } catch {
            showError('No se pudo cargar la información de eventos.');
        } finally {
            setLoadingPage(false);
        }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const submitEvent = async (payload) => {
        setSubmitting(true);
        try {
            await createEventRequest(payload);
            showSuccess('Solicitud enviada. El administrador la revisará pronto.');
            await fetchAll();
            return { ok: true };
        } catch (err) {
            const errors = err.response?.data?.error;
            const message = Array.isArray(errors)
                ? errors.map(e => e.message).join(' | ')
                : err.response?.data?.message || 'No se pudo enviar la solicitud.';
            return { ok: false, message };
        } finally {
            setSubmitting(false);
        }
    };

    const cancelRequest = async (id) => {
        try {
            await cancelEventRequest(id);
            showSuccess('Solicitud cancelada.');
            await fetchAll();
        } catch (err) {
            showError(err.response?.data?.message || 'No se pudo cancelar la solicitud.');
        }
    };

    return {
        eventRequests,       
        additionalServices,
        branches,
        loadingPage,
        submitting,
        submitEvent,
        cancelRequest,
    };
};