
'use strict';

import { useState, useEffect } from 'react';
import { getBranches } from '../../../shared/api/client.js';
import { showError } from '../../../shared/utils/toast.js';

export const useBranches = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await getBranches();
                setBranches(data.data || []);
            } catch {
                showError('No se pudieron cargar las sucursales.');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return { branches, loading };
};