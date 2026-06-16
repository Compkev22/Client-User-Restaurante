'use strict';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginRequest } from '../../../shared/api/auth.js';
import { syncProfile } from '../../../shared/api/client.js';
import { showError } from '../../../shared/utils/toast.js';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            checkAuth: () => {
                const { token, user } = get();
                const isClient = user?.role === 'CLIENT';

                if (token && !isClient) {
                    get().logout();
                    set({ error: 'Acceso denegado. Esta app es exclusiva para clientes.' });
                }
            },

            login: async ({ UserEmail, password }) => {
                set({ loading: true, error: null });
                try {
                    const { data } = await loginRequest({ UserEmail, password });

                    // .NET sin CamelCase policy → claves raíz en PascalCase
                    const details = data.UserDetails;

                    // ── Guardia de rol ──
                    if (details?.role !== 'CLIENT') {
                        const message = 'Acceso denegado. Esta app es exclusiva para clientes.';
                        set({ user: null, token: null, isAuthenticated: false, loading: false, error: message });
                        showError(message);
                        return { success: false, error: message };
                    }

                    // ── Mapeo alineado con [JsonPropertyName] del DTO ──
                    const user = {
                        authId: details.id,
                        firstName: details.userName,
                        lastName: details.userSurname,
                        username: details.systemUsername,
                        UserEmail: details.userEmail,
                        role: details.role,
                        UserStatus: details.userStatus,
                        phone: details.phone,
                        UserCreatedAt: details.userCreatedAt,
                        profilePicture: details.profilePicture,
                    };

                    set({
                        user,
                        token: data.Token,
                        isAuthenticated: true,
                        loading: false,
                    });

                    // ── Sincroniza perfil en MongoDB ──
                    try {
                        const sync = await syncProfile({
                            UserName: user.firstName,
                            UserSurname: user.lastName,
                            UserEmail: user.UserEmail,
                            phone: user.phone,
                        });
                        set((state) => ({
                            user: { ...state.user, uid: sync.data.data._id },
                        }));
                    } catch (syncErr) {
                        console.error('Error sincronizando perfil local:', syncErr);
                    }

                    return { success: true };

                } catch (err) {
                    const status = err.response?.status;
                    const message =
                        status === 400 ? 'Correo o contraseña incorrectos' :
                            status === 401 ? 'Verifica tu correo antes de iniciar sesión' :
                                status === 403 ? 'Esta app es exclusiva para clientes' :
                                    'Error de conexión. Intenta más tarde.';

                    set({ loading: false, error: message });
                    showError(message);
                    return { success: false, error: message };
                }
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false, error: null });
            },

            updateUser: (userData) => {
                set((state) => ({ user: { ...state.user, ...userData } }));
            },
        }),
        { name: 'client-auth-store' }
    )
);
