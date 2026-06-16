'use strict';

import axios from 'axios';
import { useAuthStore } from '../../features/auth/store/authStore.js';

// ─── INSTANCIAS AXIOS ─────────────────────────────────────────────
const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' },
});

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_USER_API_URL,
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' },
});

// ─── INTERCEPTOR REQUEST: inyectar token en ambas instancias ─────
const attachToken = (config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
};

axiosAuth.interceptors.request.use(attachToken);
axiosClient.interceptors.request.use(attachToken);

// ─── INTERCEPTOR RESPONSE: 401 -> logout global ──────────────────
const handle401 = (error) => {
    if (error.response?.status === 401) {
        useAuthStore.getState().logout();
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
};

axiosAuth.interceptors.response.use((res) => res, handle401);
axiosClient.interceptors.response.use((res) => res, handle401);

export { axiosAuth, axiosClient };