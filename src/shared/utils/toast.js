'use strict';

import { toast } from 'react-hot-toast';

const baseStyle = {
    borderRadius: '8px',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    padding: '14px 20px',
    boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)',
};

export const showSuccess = (message) =>
    toast.success(message, {
        style: {
            ...baseStyle,
            background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
            color: '#fff',
            border: '2px solid #22c55e',
        },
        iconTheme: { primary: '#fff', secondary: '#22c55e' },
    });

export const showError = (message) =>
    toast.error(message, {
        style: {
            ...baseStyle,
            background: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)',
            color: '#fff',
            border: '2px solid #ef4444',
        },
        iconTheme: { primary: '#fff', secondary: '#ef4444' },
    });

export const showInfo = (message) =>
    toast(message, {
        style: {
            ...baseStyle,
            background: 'linear-gradient(90deg, #fb923c 0%, #e11d48 100%)',
            color: '#fff',
            border: '2px solid #fb923c',
        },
        iconTheme: { primary: '#fff', secondary: '#fb923c' },
    });