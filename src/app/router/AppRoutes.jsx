'use strict';

import { Routes, Route, Navigate } from 'react-router-dom';

// Layout y guard
import { ProtectedRoute }   from './ProtectedRoute.jsx';
import { ClientContainer }  from '../../shared/components/layout/ClientContainer.jsx';

// ── Auth (única feature con subcarpeta pages/) ────────────────────
import { AuthPage }         from '../../features/auth/pages/AuthPage.jsx';

// ── Features — vistas como componentes ───────────────────────────
import { HomeView }         from '../../features/home/components/HomeView.jsx';
import { MenuView }         from '../../features/menu/components/MenuView.jsx';
import { CartView }         from '../../features/cart/components/CartView.jsx';
import { CheckoutView }     from '../../features/cart/components/CheckoutView.jsx';
import { OrdersView }       from '../../features/orders/components/OrdersView.jsx';
import { OrderDetailView }  from '../../features/orders/components/OrderDetailView.jsx';
import { ReservationsView } from '../../features/reservations/components/ReservationsView.jsx';
import { EventsView }       from '../../features/events/components/EventsView.jsx';
import { ReviewsView }      from '../../features/reviews/components/ReviewsView.jsx';
import { ProfileView }      from '../../features/users/components/ProfileView.jsx';

// ── Páginas estáticas del app shell ──────────────────────────────
import { NotFoundView }     from '../../features/home/components/NotFoundView.jsx';

export const AppRoutes = () => (
    <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/"      element={<Navigate to="/login" replace />} />

        {/* Rutas protegidas bajo layout principal */}
        <Route element={<ProtectedRoute />}>
            <Route path="/portal" element={<ClientContainer />}>
                <Route index                          element={<HomeView />} />
                <Route path="menu"                    element={<MenuView />} />
                <Route path="carrito"                 element={<CartView />} />
                <Route path="checkout"                element={<CheckoutView />} />
                <Route path="pedidos"                 element={<OrdersView />} />
                <Route path="pedido/:orderId"         element={<OrderDetailView />} />
                <Route path="reservas"                element={<ReservationsView />} />
                <Route path="eventos"                 element={<EventsView />} />
                <Route path="resenas"                 element={<ReviewsView />} />
                <Route path="perfil"                  element={<ProfileView />} />
            </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundView />} />
    </Routes>
);