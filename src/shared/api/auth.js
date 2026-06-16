'use strict';

import { axiosAuth } from './api.js';

// ================= LOGIN (exclusivo CLIENT) =================
export const login = async ({ UserEmail, password }) => {
    const formData = new FormData();
    formData.append('EmailOrUsername', UserEmail);
    formData.append('Password', password);

    return await axiosAuth.post('/api/v1/Auth/login-client', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// ================= REGISTER =================
export const register = async (data) => {
    const formData = new FormData();
    formData.append('UserName',     data.UserName);
    formData.append('UserSurname',  data.UserSurname);
    formData.append('Username',     data.Username);
    formData.append('Email',        data.UserEmail);
    formData.append('Password',     data.password);
    formData.append('Phone',        data.phone);

    // Guardamos el email para usarlo en la verificación automática
    localStorage.setItem('pending_verification_email', data.UserEmail);
    return await axiosAuth.post('/api/v1/Auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// ================= VERIFY EMAIL (automático, sin input del usuario) =================
export const verifyEmail = async ({ email, token }) => {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Token', token);

    return await axiosAuth.post('/api/v1/Auth/verify-email', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (email) => {
    const formData = new FormData();
    formData.append('Email', email);

    return await axiosAuth.post('/api/v1/Auth/forgot-password', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// ================= RESET PASSWORD =================
export const resetPassword = async (token, newPassword) => {
    const formData = new FormData();
    formData.append('Token',       token);
    formData.append('NewPassword', newPassword);

    return await axiosAuth.post('/api/v1/Auth/reset-password', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};