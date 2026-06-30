'use strict';

import { useState, useEffect } from 'react';
import { getMenu } from '../../../shared/api/client.js';
import { showError } from '../../../shared/utils/toast.js';
import { useBranchStore } from '../../auth/store/clientStore.js';

export const useMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading]     = useState(true);
    const [search, setSearch]       = useState('');
    const [filterType, setFilterType] = useState('TODOS');

    const { selectedBranch } = useBranchStore();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await getMenu(selectedBranch?._id);
                setMenuItems(data.menu || []);
            } catch {
                showError('No se pudo cargar el menú.');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [selectedBranch?._id]); // ← recarga cuando cambia la sucursal

    const filtered = menuItems.filter((item) => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.category?.toLowerCase().includes(search.toLowerCase());
        const matchType = filterType === 'TODOS' || item.type === filterType;
        return matchSearch && matchType;
    });

    const categories = ['TODOS', 'Individual', 'Combo'];

    return { filtered, loading, search, setSearch, filterType, setFilterType, categories, total: menuItems.length };
};