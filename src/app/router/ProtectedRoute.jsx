'use strict';

import { Navigate, Outlet } from 'react-router-dom';
import { useClientStore } from '../../features/auth/store/clientStore.js';

export const ProtectedRoute = () => {
    const token          = useClientStore((s) => s.token);
    const isAuthenticated = useClientStore((s) => s.isAuthenticated);
    const user           = useClientStore((s) => s.user);

    if (!token || !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Solo CLIENTs acceden al portal
    if (user?.role !== 'CLIENT') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};