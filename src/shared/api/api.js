'use strict';

import axios from 'axios';

// ─── INSTANCIA BASE ──────────────────────────────────────────────
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_USER_API_URL,
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' },
});

// ─── INTERCEPTOR REQUEST: inyectar token ─────────────────────────
axiosClient.interceptors.request.use((config) => {
    // Importación lazy para evitar dependencia circular con el store
    const raw = localStorage.getItem('kinal-client-store');
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            const token = parsed?.state?.token;
            if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch {
            // token corrupto — ignorar
        }
    }
    return config;
});

// ─── INTERCEPTOR RESPONSE: manejar 401 globalmente ───────────────
axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('kinal-client-store');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export { axiosClient };