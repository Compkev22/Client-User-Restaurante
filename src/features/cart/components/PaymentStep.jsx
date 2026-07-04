'use strict';

import { formatCurrency } from '../../../shared/utils/formatters.js';
import { Button } from '../../../shared/ui/Button.jsx';
import { CreditCard } from './CreditCard.jsx';

const formatCardNumber = (value) => {
    const clean = value.replace(/\D/g, '').slice(0, 16);
    return clean.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = (value) => {
    const clean = value.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 3) {
        return clean.slice(0, 2) + '/' + clean.slice(2);
    }
    return clean;
};

const isExpiryValid = (expiry) => {
    if (expiry.length !== 5) return false;
    const [monthStr, yearStr] = expiry.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt('20' + yearStr, 10);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    return year > currentYear || (year === currentYear && month > currentMonth);
};

export const PaymentStep = ({
    cardNumber, setCardNumber,
    cardHolder, setCardHolder,
    cardExpiry, setCardExpiry,
    cardCvv, setCardCvv,
    error, setError,
    isConfirming,
    total, subtotal, iva,
    onPay, onBack, backLabel
}) => {
    const valid = cardNumber.replace(/\s/g, '').length === 16
        && cardHolder.trim().length >= 3
        && isExpiryValid(cardExpiry)
        && cardCvv.length === 3;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 animate-fadeIn space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#e11d48] flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }}>
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>
                <h1 className="text-3xl font-black text-[#7f1d1d] mb-1">Pago con Tarjeta</h1>
                <p className="text-gray-500 text-sm">Ingresa los datos de tu tarjeta de credito o debito.</p>
            </div>

            <CreditCard cardNumber={cardNumber} cardHolder={cardHolder} expiry={cardExpiry} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto space-y-5">
                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Numero de Tarjeta</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => { setCardNumber(formatCardNumber(e.target.value)); setError(''); }}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        disabled={isConfirming}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 font-mono tracking-wider"
                    />
                    {cardNumber.replace(/\s/g, '').length > 0 && cardNumber.replace(/\s/g, '').length < 16 && (
                        <p className="text-[11px] text-amber-500 mt-1 font-bold">Faltan {16 - cardNumber.replace(/\s/g, '').length} dígitos</p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Nombre del Titular</label>
                    <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => { setCardHolder(e.target.value.replace(/[0-9]/g, '').toUpperCase()); setError(''); }}
                        placeholder="NOMBRE APELLIDO"
                        disabled={isConfirming}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 uppercase"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">Fecha de Vencimiento</label>
                        <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => { setCardExpiry(formatExpiry(e.target.value)); setError(''); }}
                            placeholder="MM/AA"
                            maxLength={5}
                            disabled={isConfirming}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 font-mono"
                        />
                        {cardExpiry.length === 5 && !isExpiryValid(cardExpiry) && (
                            <p className="text-[11px] text-amber-500 mt-1 font-bold">Fecha no válida</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#a16207] uppercase mb-1">CVV</label>
                        <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => { setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3)); setError(''); }}
                            placeholder="***"
                            maxLength={3}
                            disabled={isConfirming}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-[#e11d48] focus:ring-2 focus:ring-red-100 font-mono"
                        />
                        {cardCvv.length > 0 && cardCvv.length < 3 && (
                            <p className="text-[11px] text-amber-500 mt-1 font-bold">Debe ser 3 dígitos</p>
                        )}
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 text-xs font-bold">{error}</p>
                )}

                <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>IVA (12%)</span>
                        <span>{formatCurrency(iva)}</span>
                    </div>
                    <div className="flex justify-between font-black text-lg text-[#e11d48] border-t border-gray-100 pt-2">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button variant="ghost" className="flex-1" onClick={onBack} disabled={isConfirming}>
                        Atras
                    </Button>
                    <Button
                        className="flex-1"
                        loading={isConfirming}
                        disabled={!valid || isConfirming}
                        onClick={() => onPay(valid)}
                    >
                        {isConfirming ? 'Procesando...' : 'Pagar ' + formatCurrency(total)}
                    </Button>
                </div>
            </div>
        </div>
    );
};
