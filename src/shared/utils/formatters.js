'use strict';

/**
 * Formatea un número como moneda guatemalteca
 * @param {number} amount
 * @returns {string} "Q 25.00"
 */
export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'Q 0.00';
    return `Q ${Number(amount).toFixed(2)}`;
};

/**
 * Formatea una fecha ISO a formato legible en español
 * @param {string|Date} dateStr
 * @returns {string}
 */
export const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('es-GT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Formatea una fecha ISO a formato corto
 * @param {string|Date} dateStr
 * @returns {string}
 */
export const formatDateShort = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('es-GT');
};

/**
 * Obtiene las iniciales de un nombre completo
 * @param {string} name
 * @param {string} surname
 * @returns {string} "AB"
 */
export const getInitials = (name = '', surname = '') => {
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
};

/**
 * Trunca un texto a n caracteres
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 80) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};