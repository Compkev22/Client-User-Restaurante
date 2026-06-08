'use strict';

import { axiosClient } from './api.js';

export const loginRequest = (credentials) =>
    axiosClient.post('/auth/login', credentials);

export const registerRequest = (data) =>
    axiosClient.post('/auth/register', data);

export const verifyEmailRequest = (token) =>
    axiosClient.get('/auth/verify-email', {
        headers: { Authorization: `Bearer ${token}` },
    });

export const forgotPasswordRequest = (email) =>
    axiosClient.post('/auth/forgot-password', { email });

export const resetPasswordRequest = (data) =>
    axiosClient.post('/auth/reset-password', data);