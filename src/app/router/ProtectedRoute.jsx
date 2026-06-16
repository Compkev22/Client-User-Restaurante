'use strict';

import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/authStore.js';

export const ProtectedRoute = () => {
    const token           = useAuthStore((s) => s.token);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const user            = useAuthStore((s) => s.user);

    if (!token || !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Solo CLIENTs acceden al portal
    if (user?.role !== 'CLIENT') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};