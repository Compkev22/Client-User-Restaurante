'use strict';

import { useEffect, useCallback } from 'react';
import {
    useEventStore,
    useAdditionalServiceStore,
    useBranchStore,
} from '../../auth/store/clientStore.js';

export const useEvents = () => {
    const {
        events,
        loading: loadingEvents,
        createEvent,
        getEvents,
    } = useEventStore();

    const {
        additionalServices,
        loading: loadingServices,
        getAdditionalServices,
    } = useAdditionalServiceStore();

    const {
        branches,
        loading: loadingBranches,
        getBranches,
    } = useBranchStore();

    useEffect(() => {
        getEvents();
        getAdditionalServices();
        getBranches();
    }, []);

    const refetchEvents = useCallback(async () => {
        await getEvents();
    }, [getEvents]);

    const submitEvent = async (payload) => {
        try {
            await createEvent(payload);
            return true;
        } catch (err) {
            return false;
        }
    };

    const loadingPage = loadingEvents || loadingServices || loadingBranches;

    return {
        events,
        additionalServices,
        branches,
        loadingPage,
        submitting: loadingEvents,
        submitEvent,
        refetchEvents,
    };
};