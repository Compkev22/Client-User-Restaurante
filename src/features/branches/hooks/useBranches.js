
'use strict';

import { useState, useEffect } from 'react';
import { getBranches } from '../../../shared/api/client.js';
import { showError } from '../../../shared/utils/toast.js';

export const useBranches = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('TODAS');

    useEffect(() => {
        const timer = setTimeout(() => {
            const fetch = async () => {
                setLoading(true);
                try {
                    const params = {};
                    if (search.trim()) params.search = search.trim();
                    if (category !== 'TODAS') params.category = category;
                    const { data } = await getBranches(params);
                    setBranches(data.data || []);
                } catch {
                    showError('No se pudieron cargar las sucursales.');
                } finally {
                    setLoading(false);
                }
            };
            fetch();
        }, 400); // debounce: espera 400ms de inactividad antes de pegarle al backend

        return () => clearTimeout(timer);
    }, [search, category]);

    const categories = ['TODAS', 'Gourmet', 'Buffet', 'Fast Food', 'Familiar'];

    return { branches, loading, search, setSearch, category, setCategory, categories };
};