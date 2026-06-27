
'use strict';

import { useState, useEffect } from 'react';
import { getMenu } from '../../../shared/api/client.js';
import { showError } from '../../../shared/utils/toast.js';

export const useMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading]     = useState(true);
    const [search, setSearch]       = useState('');
    const [filterType, setFilterType] = useState('TODOS');

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await getMenu();
                setMenuItems(data.menu || []);
            } catch {
                showError('No se pudo cargar el menú.');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const filtered = menuItems.filter((item) => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.category?.toLowerCase().includes(search.toLowerCase());
        const matchType = filterType === 'TODOS' || item.type === filterType;
        return matchSearch && matchType;
    });

    const categories = ['TODOS', 'Individual', 'Combo'];

    return { filtered, loading, search, setSearch, filterType, setFilterType, categories, total: menuItems.length };
};