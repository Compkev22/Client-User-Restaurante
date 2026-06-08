'use strict';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kinal_favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) setFavorites(JSON.parse(saved));
        } catch {
            console.error('Error cargando favoritos');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite    = (id) => favorites.some((f) => f._id === id);

    const toggleFavorite = (item) => {
        setFavorites((prev) =>
            isFavorite(item._id)
                ? prev.filter((f) => f._id !== item._id)
                : [...prev, item]
        );
    };

    const clearFavorites = () => setFavorites([]);

    return { favorites, isFavorite, toggleFavorite, clearFavorites };
};