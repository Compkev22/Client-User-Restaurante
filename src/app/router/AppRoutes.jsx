'use strict';

import { Routes, Route, Navigate } from 'react-router-dom';

import { ProtectedRoute }    from './ProtectedRoute.jsx';
import { ClientContainer }   from '../../shared/components/layout/ClientContainer.jsx';

import { AuthPage }          from '../../features/auth/pages/AuthPage.jsx';
import { VerifyEmailPage }   from '../../features/auth/components/VerifyEmailPage.jsx';

import { HomeView }          from '../../features/home/components/HomeView.jsx';
import { MenuView }          from '../../features/menu/components/MenuView.jsx';
import { CartView }          from '../../features/cart/components/CartView.jsx';
import { CheckoutView }      from '../../features/cart/components/CheckoutView.jsx';
import { OrdersView }        from '../../features/orders/components/OrdersView.jsx';
import { OrderDetailView }   from '../../features/orders/components/OrderDetailView.jsx';
import { ReservationsView }  from '../../features/reservations/components/ReservationsView.jsx';
import { EventsView }        from '../../features/events/components/EventView.jsx';
import { ReviewsView }       from '../../features/reviews/components/ReviewsView.jsx';
import { ProfileView }       from '../../features/users/components/ProfileView.jsx';
import { NotFoundView }      from '../../features/home/components/NotFoundView.jsx';
import { ResetPasswordPage } from '../../features/auth/components/ResetPasswordForm.jsx';
import { BranchesView } from '../../features/branches/components/BranchesView.jsx';


export const AppRoutes = () => (
    <Routes>
        {/* Rutas públicas */}
        <Route path="/login"        element={<AuthPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/"             element={<Navigate to="/login" replace />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
            <Route path="/portal" element={<ClientContainer />}>
                <Route index                       element={<HomeView />} />
                <Route path="menu"                 element={<MenuView />} />
                <Route path="carrito"              element={<CartView />} />
                <Route path="checkout"             element={<CheckoutView />} />
                <Route path="pedidos"              element={<OrdersView />} />
                <Route path="pedido/:orderId"      element={<OrderDetailView />} />
                <Route path="reservas"             element={<ReservationsView />} />
                <Route path="eventos"              element={<EventsView />} />
                <Route path="resenas"              element={<ReviewsView />} />
                <Route path="perfil"               element={<ProfileView />} />
                <Route path="sucursales"           element={<BranchesView />} />
            </Route>
        </Route>

        <Route path="*" element={<NotFoundView />} />
    </Routes>
);